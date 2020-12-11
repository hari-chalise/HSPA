import { SortPipe } from './Pipes/sort.pipe';
import { PropertyDetailResolverService } from './property/property-detail/property-detail-resolver.service';
import { AuthService } from './services/auth.service';
import { AlertifyService } from './services/alertify.service';
import { UserService } from './services/user.service';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { AddPropertiesComponent } from './property/add-properties/add-properties.component';
import { HousingService } from './services/housing.service';
import { PropertyCardListComponent } from './property/property-card-list/property-card-list.component';
import { PropertyCardComponent } from './property/property-card/property-card.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FilterPipe } from './Pipes/filter.pipe';
const appRoutes: Routes = [
  {
    path: '', component: PropertyCardListComponent
  },
  {
    path: 'rent-properties', component: PropertyCardListComponent
  },
  {
    path: 'add-properties', component: AddPropertiesComponent
  },
  {
    path: 'property-detail/:id', component: PropertyDetailComponent, resolve: {prp: PropertyDetailResolverService}
  },
  {
    path: 'user/login', component: UserLoginComponent
  },
  {
    path: 'user/register', component: UserRegisterComponent
  },
  {
    path: '**', component: PropertyCardListComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    PropertyCardListComponent,
    NavBarComponent,
    AddPropertiesComponent,
    PropertyDetailComponent,
    UserLoginComponent,
    UserRegisterComponent,
    FilterPipe,
    SortPipe,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ButtonsModule,
    NgxGalleryModule,
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HousingService,
    AlertifyService,
    AuthService,
    UserService,
    PropertyDetailResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
