import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {ContactPageComponent} from './pages/contact-page/contact-page.component';
import {ContactDetailsComponent} from './pages/contact-details/contact-details.component';
import {ContactEditComponent} from './pages/contact-edit/contact-edit.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';




const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'contact/edit', component: ContactEditComponent },
  { path: 'contact/:id', component: ContactDetailsComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'statistic', component: StatisticPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
