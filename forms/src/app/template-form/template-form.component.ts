import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.css'
})
export class TemplateFormComponent {
  constructor(
    private http: HttpClient,
    private cepService: ConsultaCepService
    ){}

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
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    .subscribe(dados => console.log(dados));
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

  consultaCep(cep: string, form: any) {

    if(cep != null && cep !== "") {
      this.cepService.consultaCep(cep)?.subscribe(dados => this.populaDadosForm(dados, form));
    }
  }

  populaDadosForm(dados: any, formulario: any) {
    // form.setValue({
    //   nome: form.value.nome,
    //   email: form.value.email,
    //   endereco: {
    //     cep: dados.cep,
    //     numero: form.value.endereco.numero,
    //     complemento: dados.complemento,
    //     rua: dados.logradouro,
    //     bairro: dados.bairro,
    //     cidade: dados.localidade,
    //     estado: dados.uf
    //   }
    // });

    
    formulario.form.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  resetaDadosForm(form: any) {
    form.form.patchValue({
      endereco: {
        cep: null,
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

}
