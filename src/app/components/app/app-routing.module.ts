import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { GraficasComponent } from '../graficas/graficas.component';
import { AboutComponent } from '../about/about.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'graphics', component: GraficasComponent
  },
  {
    path: 'about', component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
