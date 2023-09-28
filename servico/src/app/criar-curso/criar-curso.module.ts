import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { CursosService } from '../cursos/cursos.service';
import { CriarCursoComponent } from '../criar-curso/criar-curso.component';
import { CommonModule } from '@angular/common';
import { ReceberCursoCriadoComponent } from '../receber-curso-criado/receber-curso-criado.component';

@NgModule({
  declarations: [
    CriarCursoComponent,
    ReceberCursoCriadoComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [CriarCursoComponent]

})
export class CriarCursoModule { }
