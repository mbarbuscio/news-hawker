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

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule, 
    FormsModule, 
    PipesModule,
    MatIconModule,
    MatTabsModule,
    DirectivesModule
  ],
  declarations: [CountrySelectorComponent, NavBarComponent, SettingsComponent],
  exports: [CountrySelectorComponent, NavBarComponent, MatTabsModule, MatIconModule, SettingsComponent]
})
export class SharedModule { }
