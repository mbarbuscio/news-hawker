import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountrySelectorComponent } from './country-selector/country-selector.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
  imports: [
    CommonModule,
    NgSelectModule, 
    FormsModule
  ],
  declarations: [CountrySelectorComponent, NavBarComponent],
  exports: [CountrySelectorComponent, NavBarComponent]
})
export class SharedModule { }
