import { Property } from './../../model/property';
import { HousingService } from './../../services/housing.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery/lib/ngx-gallery-options';
import { NgxGalleryImage } from '@kolkov/ngx-gallery/lib/ngx-gallery-image';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
public propertyId: number;
property = new Property();
galleryOptions: NgxGalleryOptions[];
galleryImages: NgxGalleryImage[];
  constructor(private route: ActivatedRoute,
              private router: Router,
              private housingService: HousingService
     ) { }

  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: Property) => {
        this.property = data['prp'];
      }
    );

    // this.route.params.subscribe(
    //   (params) => {
    //     this.propertyId = +params['id'];
    //     this.housingService.getProperty(this.propertyId).subscribe(
    //       (data: Property) => {
    //         this.property = data;
    //       }, error => this.router.navigate(['/'])
    //     );
    //   }
    // );

    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },

    ];

    this.galleryImages = [
      {
        small: 'assets/images/download1.jpg',
        medium: 'assets/images/download3.jpg',
        big: 'assets/images/janakpur.jpg'
      },
      {
        small: 'assets/images/download2.jpg',
        medium: 'assets/images/janakpur.jpg',
        big: 'assets/images/pashupati4.jpg'
      },
      {
        small: 'assets/images/download1.jpg',
        medium: 'assets/images/janakpur.jpg',
        big: 'assets/images/janakpur.jpg'
      },{
        small: 'assets/images/janakpur.jpg',
        medium: 'assets/images/janakpur.jpg',
        big: 'assets/images/pashupati2.jpg'
      },
      {
        small: 'assets/images/pashupati4.jpg',
        medium: 'assets/images/janakpur.jpg',
        big: 'assets/images/janakpur.jpg'
      }
    ];

  }




}
