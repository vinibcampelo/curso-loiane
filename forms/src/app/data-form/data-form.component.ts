import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {

  }

  onSubmit(){
    console.log(this.formulario.value);
    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
    .subscribe({
      next: (dados) => console.log(dados),
      error: (error) => alert("Algo não esperado ocorreu"),
      complete: () => this.formulario.reset()
  });
  }

  resetar() {
    this.formulario.reset()
  }

  aplicaValidacao(campo: any) {
    const campoForm = this.formulario.get(campo);
    if (this.verificaInvalidTouched(campoForm)) {
      return 'is-invalid'
    } else if(this.verificaValidTouched(campoForm)) {
      return 'is-valid'
    }
    return ''    
  }

  verificaInvalidTouched(campo: any):boolean {
    return campo.invalid && campo.touched;
  }

  verificaValidTouched(campo: any): boolean {
    return campo.valid && campo.touched;
  }

  validaEmail() {
    const emailForm = this.formulario.get('email');
    console.log(emailForm?.errors);
    
    if(emailForm?.errors) {
      console.log(emailForm?.errors['email']);
      
      return emailForm.errors['email'] && emailForm.touched
    }
    return false;
  }


}
