import { Component } from '@angular/core';

import { CursosService } from '../cursos/cursos.service';

@Component({
  selector: 'app-criar-curso',
  templateUrl: './criar-curso.component.html',
  styleUrls: ['./criar-curso.component.scss'],
  providers: [CursosService],

})
export class CriarCursoComponent {

  cursos: string[] = [];

  constructor(private cursosService: CursosService) {

  }

  ngOnInit() {
    this.cursos = this.cursosService.getCursos();
  }

  onAddCursos(curso: string) {
    this.cursosService.addCurso(curso);
  }

}
