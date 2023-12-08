import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-curso-nao-encontrado',
  templateUrl: './curso-nao-encontrado.component.html',
  styleUrls: ['./curso-nao-encontrado.component.css']
})
export class CursoNaoEncontradoComponent {
  inscricao: Subscription = new Subscription
  id!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(){
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        }
    )
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
}
