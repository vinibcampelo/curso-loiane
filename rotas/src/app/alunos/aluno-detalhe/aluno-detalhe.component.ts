import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { AlunosService } from "../alunos.service";


@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent  implements OnInit, OnDestroy{

  id!: number;
  inscricao: Subscription = new Subscription;
  aluno: any;

  constructor(
    private route: ActivatedRoute,
    private alunoService: AlunosService
    ){
  }

  ngOnInit(){
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        console.log(this.id)
        this.aluno = this.alunoService.getAluno(this.id)
    })
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
}