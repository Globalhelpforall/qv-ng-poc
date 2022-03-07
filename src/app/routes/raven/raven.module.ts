import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { RavenRoutingModule } from './raven-routing.module';
import { LogosComponent } from './logos/logos.component';

import { LogosSoloComponent } from './logossolo/logossolo.component';
import { Sr2mlComponent, Sr2mlReportComponent } from './';


const COMPONENTS_DYNAMIC = [];
@NgModule({
  declarations: [Sr2mlComponent, LogosComponent, LogosSoloComponent, Sr2mlReportComponent],
  imports: [
    CommonModule,
    SharedModule,
    RavenRoutingModule
  ],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class RavenModule { }
