import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AlunosService } from "../alunos.service";
import { Aluno } from "../aluno";


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
    private router: Router,
    private route: ActivatedRoute,
    private alunoService: AlunosService
    ){
  }

  editarContato() {
    this.router.navigate(['/alunos', this.aluno.id, "edit"])
  }

  ngOnInit(){
    // this.inscricao = this.route.params.subscribe(
    //   (params: any) => {
    //     this.id = params['id'];
    //     console.log(this.id)
    //     this.aluno = this.alunoService.getAluno(this.id)
    // })

    console.log("ngOnInit: AlunoDetalheComponent")

    this.inscricao = this.route.data.subscribe(
      (info) => {
        console.log("Recebendo a informação do AlunoDetalheResolve ")
        this.aluno = info['aluno'];
      }
    );
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
}