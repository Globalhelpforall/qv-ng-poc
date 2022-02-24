import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { RavenRoutingModule } from './raven-routing.module';
import { Sr2mlComponent } from './sr2ml/sr2ml.component';
import { LogosComponent } from './logos/logos.component';

import { LogosSoloComponent } from './logossolo/logossolo.component';


const COMPONENTS_DYNAMIC = [];
@NgModule({
  declarations: [Sr2mlComponent, LogosComponent, LogosSoloComponent],
  imports: [
    CommonModule,
    SharedModule,
    RavenRoutingModule
  ],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class RavenModule { }