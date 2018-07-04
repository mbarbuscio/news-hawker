import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LegalModule } from './legal/legal.module';
import { PrivacyComponent } from './legal/privacy/privacy.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'}
  ,{ path: 'home', component: HomeComponent }
  ,{ path: 'privacy-policy', component: PrivacyComponent}
  ,{ path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
