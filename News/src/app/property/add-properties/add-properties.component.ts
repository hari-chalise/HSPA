import { AlertifyService } from './../../services/alertify.service';
import { HousingService } from './../../services/housing.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { Property } from 'src/app/model/property';
import { IPropertyBase } from '../../model/ipropertybase';


@Component({
  selector: 'app-add-properties',
  templateUrl: './add-properties.component.html',
  styleUrls: ['./add-properties.component.css']
})
export class AddPropertiesComponent implements OnInit {

  // @ViewChild('Form') addPropertyForm: NgForm;
  addPropertyForm: FormGroup;
  property = new Property();
  NextClicked: boolean;
  @ViewChild('formTabs') formTabs: TabsetComponent;

  // These will comes From The Master Table
  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnish'];
  cityList: string[];

  propertyView: IPropertyBase = {
    Id: null,
    Name: null,
    Price: null,
    SellRent: null,
    PType: null,
    FType: null,
    BHK: null,
    BuiltArea: null,
    City: null,
    RTM: null,
  };

  constructor(private router: Router,
              private fb: FormBuilder,
              private housingService: HousingService,
              private alertifyService: AlertifyService,
             ) { }

  ngOnInit(): void {
    this.initForm();
    this.housingService.getAllCities().subscribe(data => {
      this.cityList  = data;
      console.log(data);
    });
  }

  initForm() {
    this.addPropertyForm = this.fb.group({
      basicInfo: this.fb.group({
        sellRent: ['1', Validators.required],
        pType: [null, Validators.required],
        BHK: [null, Validators.required],
        name: [null, Validators.required],
        city: ['', Validators.required],
        fType: [null, Validators.required],
      }),
      priceInfo: this.fb.group({
        price: [null, Validators.required],
        builtArea: [null, Validators.required],
        carpetArea: [null],
        security: [null],
        maintenance: [null],
      }),
      addressInfo: this.fb.group({
        florNo: [null],
        totalFlor: [null],
        address: [null, Validators.required],
        landMark: [null],
      }),
      otherInfo: this.fb.group({
        RTM: [null, Validators.required],
        posessionOn: [null],
        AOP: [null],
        gated: [null],
        mainEntrance: [null],
        description: [null]
      })
    });
  }


  // #region <Getter Method>

//#region <FormGroup>
  get basicInfo() {
    return this.addPropertyForm.controls.basicInfo as FormGroup;
  }
  get priceInfo() {
    return this.addPropertyForm.controls.priceInfo as FormGroup;
  }

get addressInfo() {
  return this.addPropertyForm.controls.addressInfo as FormGroup;
}

get otherInfo() {
  return this.addPropertyForm.controls.otherInfo as FormGroup;

}


// #region <Form Controls>
  get sellRent() {
    return this.basicInfo.controls.sellRent as FormControl;
  }

  get BHK() {
return this.basicInfo.controls.BHK as FormControl;
  }

  get pType() {
    return this.basicInfo.controls.pType as FormControl;
  }

  get fType() {
    return this.basicInfo.controls.fType as  FormControl;
  }

  get name() {
    return this.basicInfo.controls.name as FormControl;
  }

  get city() {
    return this.basicInfo.controls.city as FormControl;
  }

  get price() {
    return this.priceInfo.controls.price as FormControl;
  }

  get builtArea() {
    return this.priceInfo.controls.builtArea as FormControl;
  }
  get carpetArea() {
    return this.priceInfo.controls.carpetArea as FormControl;
  }

get security() {
  return this.priceInfo.controls.security as FormControl;
}

get maintenance () {
  return this.priceInfo.controls.maintenance as FormControl;
}

get florNo () {
  return this.addressInfo.controls.florNo as FormControl;
}

get totalFlor() {
  return this.addressInfo.controls.totalFlor as FormControl;
}

  get address() {
    return this.addressInfo.controls.address as FormControl;
  }

  get landMark() {
    return this.addressInfo.controls.landMark as FormControl;
  }

  get RTM() {
    return this.otherInfo.controls.RTM as FormControl;
  }

  get posessionOn() {
    return this.otherInfo.controls.posessionOn as FormControl;
  }
  get AOP () {
    return this.otherInfo.controls.AOP as FormControl;
  }

  get gated () {
    return this.otherInfo.controls.gated as FormControl;
  }

  get mainEntrance() {
    return this.otherInfo.controls.mainEntrance as FormControl;
  }

  get description() {
    return this.otherInfo.controls.description as FormControl;
  }

   //#endregion

  onSubmit() {
    this.NextClicked = true;
    if (this.allTabValid()) {
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertifyService.success('New Property added Successfully!!!!!');
      if (this.sellRent.value === '2') {
  this.router.navigate(['/rent-property']);
} else {
  this.router.navigate(['/']);
}

} else {
 this.alertifyService.error('Something Error Happen, Please correct');
}

  }

mapProperty(): void {
 this.property.Id = this.housingService.newPropID();
 this.property.SellRent = +this.sellRent.value;
 this.property.BHK = this.BHK.value;
 this.property.PType = this.pType.value;
 this.property.Name = this.name.value;
 this.property.City = this.city.value;
 this.property.FType = this.fType.value;
 this.property.Price = this.price.value;
 this.property.Security = this.security.value;
 this.property.Maintenance = this.maintenance.value;
 this.property.BuiltArea = this.builtArea.value;
 this.property.CarpetArea = this.carpetArea.value;
 this.property.FloorNo = this.florNo.value;
 this.property.TotalFloor = this.totalFlor.value;
 this.property.Address = this.address.value;
 this.property.Address2 = this.landMark.value;
 this.property.RTM = this.RTM.value;
 this.property.AOP = this.AOP.value;
 this.property.Gated = this.gated.value;
 this.property.MainEntrance = this.mainEntrance.value;
 this.property.Possession = this.posessionOn.value;
 this.property.Description = this.description.value;
 this.property.PostedOn = new Date().toString();

}



  allTabValid(): boolean {
    if (this.basicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }
    if (this.priceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }

    if (this.addressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }

    if (this.otherInfo.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }

  onBack() {
    this.router.navigate(['/']);
  }

  selectTab(NextTabId: number, IsCurrentTabValid: boolean) {
    this.NextClicked = true;
    if (IsCurrentTabValid) {
      this.formTabs.tabs[NextTabId].active = true;
    }

  }

  // tslint:disable-next-line: typedef

}
