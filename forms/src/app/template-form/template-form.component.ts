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
    cep: "",
    numero: "",
    complemento: "",
  }

  onSubmit(form: any){
    console.log(form);
  }

}
