
import { HousingService } from './../../services/housing.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-property-card-list',
  templateUrl: './property-card-list.component.html',
  styleUrls: ['./property-card-list.component.css']
})
export class PropertyCardListComponent implements OnInit {
SellRent = 1;
  Properties: IPropertyBase[];
  Today =  new Date();
  City = '';
  SearchCity = '';
  SortbyParam  = '';
  SortDirection = 'asc';
  constructor(private route: ActivatedRoute,
              private housingService: HousingService) { }
  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2;
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(
      data => {
        this.Properties = data;
        console.log(this.route.snapshot.url.toString());
      }, error => {
        console.log('httperror');
        console.log(error);
      }
    );
  }

  onCityFilter() {
    this.SearchCity = this.City;
  }
  onCityFilterClear() {
    this.SearchCity = '';
    this.City = '';
  }

  // tslint:disable-next-line: typedef
  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }

  }

}
