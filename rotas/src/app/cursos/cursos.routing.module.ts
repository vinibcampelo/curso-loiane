
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CursosComponent } from "./cursos.component";
import { CursoDetalheComponent } from "./curso-detalhe/curso-detalhe.component";
import { CursoNaoEncontradoComponent } from "./curso-nao-encontrado/curso-nao-encontrado.component";

 
const cursosRoutes: Routes = [
  { path: '', component: CursosComponent },
  { path: 'naoEncontrado/:id', component: CursoNaoEncontradoComponent },
  { path: ':id', component: CursoDetalheComponent }
]

@NgModule({
  imports: [RouterModule.forChild(cursosRoutes)],
  exports: [RouterModule]
})

export class CursosRoutingModule { 

}