import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br.model';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.css'
})
export class DataFormComponent implements OnInit {
  formulario: FormGroup;
  estados: Observable<EstadoBr[]> =  new Observable();
  cargos?: any[];

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService
    ){
    // this.formulario = new FormGroup({
    //   nome: new FormControl(''),
    //   email: new FormControl('')
    // });

    this.formulario = formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required]],
        numero: [null, [Validators.required]],
        complemento: [null],
        rua: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]],
      }),
      cargo: [null]
    });
  }

  ngOnInit(): void {
    // this.dropdownService.getEstadosBr()
    //   .subscribe(dados => this.estados = dados);

    this.estados = this.dropdownService.getEstadosBr();
    this.cargos = this.dropdownService.getCargos();
  }

  onSubmit(){
    if(this.formulario.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .subscribe({
        next: (dados) => console.log(dados),
        error: (error) => alert("Algo não esperado ocorreu"),
        complete: () => this.formulario.reset()
      });
    } else {
      console.log('formulari invalido');
      // this.formulario.markAllAsTouched();
      this.verificaValidacoesForm(this.formulario)
    }
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle?.markAsTouched();

      if(controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle)
      }
    });
  }

  resetar() {
    this.formulario.reset()
  }

  aplicaValidacao(campo: string) {
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
    if(emailForm?.errors) {      
      return emailForm.errors['email'] && emailForm.touched
    }
    return false;
  }

  consultaCep() {
    let cep = this.formulario.get('endereco.cep')?.value;
    if(cep != null && cep !== "") {
      this.cepService.consultaCep(cep)?.subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados: any) {
    this.formulario.patchValue({
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


  resetaDadosForm() {
    this.formulario.patchValue({
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

  setarCargo() {
    const cargo = {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'};
    this.formulario.get('cargo')?.setValue(cargo)
  }

  compararCargos(obj1: any, obj2: any){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

}
