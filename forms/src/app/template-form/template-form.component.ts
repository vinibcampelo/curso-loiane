import { Component } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.css'
})
export class TemplateFormComponent {

  usuario: any = {
    nome: "",
    email: "",
    endereco: {
      cep: "",
      numero: "",
      complemento: "",
      rua: "",
      bairro: "",
      cidade: "",
      estado: ""
    }

  }

  onSubmit(form: any){
    console.log(form);
  }

  aplicaValidacao(campo: any) {
    return {
      'was-validated':  this.verificaInvalidTouched(campo) || this.verificaValidTouched(campo)
    }
  }

  verificaInvalidTouched(campo: any):boolean {
    return campo.invalid && campo.touched;
  }

  verificaValidTouched(campo: any): boolean {
    return campo.valid && campo.touched;
  }

}
