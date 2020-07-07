import { CursosService } from './cursos.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosComponent } from './cursos.component';
import { CusrsoDetalheComponent } from './cusrso-detalhe/cusrso-detalhe.component';

@NgModule({
  declarations: [
    CursosComponent, 
    CusrsoDetalheComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CursosComponent
  ],
  providers: [
    CursosService
  ]
})
export class CursosModule { }
