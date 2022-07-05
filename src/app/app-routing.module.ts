import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
 import { CalendarComponent } from './components/calendar/calendar.component';
// import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

const routes: Routes=[
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'calendar',
    component: CalendarComponent
  },
  {
    path:'',
    redirectTo:'login',
    pathMatch: 'full'
  },
  // {
  //   path:'**',
  //   component: PagenotfoundComponent
  // }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule {}
