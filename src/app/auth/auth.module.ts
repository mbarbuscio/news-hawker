import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UtilsModule } from '../utils/utils.module';


@NgModule({
  imports: [
    CommonModule,
    UtilsModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class AuthModule { }
