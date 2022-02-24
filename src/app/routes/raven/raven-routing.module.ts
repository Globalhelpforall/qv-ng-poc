import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Sr2mlComponent } from './sr2ml/sr2ml.component';
import { LogosComponent } from './logos/logos.component';
import { LogosSoloComponent } from './logossolo/logossolo.component';


const routes: Routes = [
  { path: 'sr2ml', component: Sr2mlComponent, data: { title: 'Material Colors' } },
  { path: 'logos', component: LogosComponent, data: { title: 'Material Icons' } },
  { path: 'logossolo', component: LogosSoloComponent, data: { title: 'Material Icons' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RavenRoutingModule { }
