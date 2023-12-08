import { Component } from '@angular/core';
import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {

  cursos: any[] = [];
  pagina!: number;
  constructor(private cursosService:CursosService) {}

  ngOnInit() {
    this.cursos = this.cursosService.getCursos();
  }

}
