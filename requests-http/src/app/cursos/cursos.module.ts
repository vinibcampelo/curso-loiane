import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { RouterModule, RouterOutlet } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CursosRoutingModule,
    RouterModule,
    RouterOutlet
  ]
})
export class CursosModule { }
