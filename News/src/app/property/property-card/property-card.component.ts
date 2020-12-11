import { IPropertyBase } from './../../model/ipropertybase';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

@Input() property: IPropertyBase;
@Input() hideIcons: boolean;

  constructor(private http: HttpClient) { }
  ngOnInit() {
    // this.http.get('data/properties.json').subscribe(
    //   data => console.log(data)
    // );
  }

}
