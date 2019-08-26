import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home.component';
import {HomeGuard} from './home.guard';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [HomeGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
