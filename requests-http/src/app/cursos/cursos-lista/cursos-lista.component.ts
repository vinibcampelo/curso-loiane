import { Component } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';

@Component({
  selector: 'app-cursos-lista',
  standalone: true,
  imports: [],
  templateUrl: './cursos-lista.component.html',
  styleUrl: './cursos-lista.component.scss',
  preserveWhitespaces: true
})
export class CursosListaComponent {
  constructor(private service: CursosService){}

  cursos?: Curso[];

  ngOnInit(){
    this.service.list().subscribe();
  }

}
