import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent {

  id!: number;
  inscricao: Subscription = new Subscription;
  curso: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cursosService: CursosService
    ){
  }

  ngOnInit(){
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.curso = this.cursosService.getCurso(this.id)
        if(this.curso == null) {
          this.router.navigate(['cursos/naoEncontrado', this.id])
        }
    })
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
}
