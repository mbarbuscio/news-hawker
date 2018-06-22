import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountrySelectorComponent } from './country-selector/country-selector.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PipesModule } from './pipes/pipes.module';
import { SettingsComponent } from './settings/settings.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DirectivesModule } from './directives/directives.module';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { SourcesComponent } from './sources/sources.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CategoriesComponent } from './categories/categories.component';
import {MatRadioModule} from '@angular/material/radio';
import { AddToHomeComponent } from './add-to-home/add-to-home.component';
import { SideBarComponent } from './side-bar/side-bar.component';


@NgModule({
  imports: [
    CommonModule,
    NgSelectModule, 
    FormsModule, 
    PipesModule,
    MatIconModule,
    MatTabsModule,
    DirectivesModule,
    MatChipsModule,
    MatFormFieldModule,
    MatRadioModule
  ],
  declarations: [CountrySelectorComponent, NavBarComponent, SettingsComponent, SourcesComponent, CategoriesComponent, AddToHomeComponent, SideBarComponent],
  exports: [CountrySelectorComponent, NavBarComponent, MatTabsModule, MatIconModule, SettingsComponent, SourcesComponent, CategoriesComponent, AddToHomeComponent, SideBarComponent]
})
export class SharedModule { }
