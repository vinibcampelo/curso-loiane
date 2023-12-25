import { Component } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.css'
})
export class TemplateFormComponent {

  usuario: any = {
    nome: "Vinicius",
    email: "vinicius@email.com"
  }

  onSubmit(form: any){
    console.log(form.value);
    console.log(this.usuario);
  }

}
