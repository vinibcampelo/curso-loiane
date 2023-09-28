import { Component } from '@angular/core';

import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
  providers: [CursosService],
})
export class CursosComponent {

  cursos: string[] = [];
  cursosService: CursosService;

  constructor(_cursosService: CursosService) {
    this.cursosService = _cursosService;
  }

  ngOnInit() {
    this.cursos = this.cursosService.getCursos();

    CursosService.criouNovoCurso.subscribe(
      curso => this.cursos.push(curso)

    );
  }

}
