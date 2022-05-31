import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MassMailingComponent } from './mass-mailing.component';

const routes: Routes = [
  { path: '', component: MassMailingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MassMailingRoutingModule { }
