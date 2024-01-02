import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.css'
})
export class DataFormComponent implements OnInit {
  formulario: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
    ){
    // this.formulario = new FormGroup({
    //   nome: new FormControl(''),
    //   email: new FormControl('')
    // });

    this.formulario = formBuilder.group({
      nome: [null],
      email: [null]
    });
  }

  ngOnInit(): void {

  }

  onSubmit(){
    console.log(this.formulario.value);
    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
    .subscribe(dados => {
      console.log(dados);
      this.formulario.reset()
    },
    (erro: any) => alert("Algo não esperado ocorreu"));
  }

  resetar() {
    this.formulario.reset()
  }
}
