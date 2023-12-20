import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit, OnDestroy {

  aluno: any;
  inscricao: Subscription = new Subscription();
  private formMudou: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private alunosService: AlunosService
  ){}

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let idAluno = params['id'];
        this.aluno = this.alunosService.getAluno(idAluno)

        if (this.aluno === null) {
          this.aluno = {}
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

  onInput(): void {
    console.log("mudou")
    this.formMudou = true;
  }

  podeMudarRota():boolean {
    if(this.formMudou) {
      return confirm('Tem certeza que deseja sair do formulário ?');
    }
    return true;
  }

}
