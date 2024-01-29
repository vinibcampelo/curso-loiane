import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br.model';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Observable, distinctUntilChanged, empty, map, switchMap, tap } from 'rxjs';
import { FormValidations } from '../shared/form-validation';
import { VerificaEmailService } from './services/verifica-email.service';
import { BaseFormComponent } from '../shared/base-form/base-form.component';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.css'
})
export class DataFormComponent extends BaseFormComponent implements OnInit {
  // formulario: FormGroup;
  estados: Observable<EstadoBr[]> =  new Observable();
  cargos?: any[];
  tecnologias?: any[];
  newsletters?: any[];
  frameworks: string[] = ['Angular', 'React', 'Vue', 'Sencha']

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
    ){
    // this.formulario = new FormGroup({
    //   nome: new FormControl(''),
    //   email: new FormControl('')
    // });
    super();
    this.formulario = formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmarEmail: [null, [Validators.required, FormValidations.equalsTo('email')]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, [Validators.required]],
        complemento: [null],
        rua: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]],
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, [Validators.requiredTrue]],
      frameworks: this.buildFrameworks()
    });

    this.formulario.get('endereco.cep')?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap( value => console.log('status do cep: ' +  value)),
        // switchMap(status => status ==='VALID' ?
        //   this.cepService.consultaCep(this.formulario.get('endereco.cep')?.value): empty()
        // )
      )
      .subscribe(status =>{
        if(status==='VALID') {
          this.cepService.consultaCep(this.formulario.get('endereco.cep')?.value)?.
          subscribe(dados => this.populaDadosForm(dados));
        }
    });
  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValidations.requiredMinCheckBox(1));
  }

  getFrameworksControls() {
    return this.formulario.get('frameworks') ? (<FormArray>this.formulario.get('frameworks')).controls : null;
  }

  ngOnInit(): void {
    // this.dropdownService.getEstadosBr()
    //   .subscribe(dados => this.estados = dados);
    // this.verificaEmailService.verificarEmail('email@email.com').subscribe();
    this.estados = this.dropdownService.getEstadosBr();
    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsletters = this.dropdownService.getNewsLetter();
  }

  submit() {
    let valueSubmit = Object.assign({}, this.formulario.value)

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
      .map((v: any, i: any) => v ? this.frameworks[i] : null)
      .filter((v: any) => v !== null)
    })

    console.log(valueSubmit);
    
    this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
    .subscribe({
      next: dados => console.log(dados),
      error: (error) => alert("Algo não esperado ocorreu"),
      complete: () => this.formulario.reset()
    });
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

  setarTecnologias() {
    const tecnologias = ['java', 'javascript', 'php'];
    this.formulario.get('tecnologias')?.setValue(tecnologias)
  }

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
    .pipe(
      map((emailExiste: any) => emailExiste ? {emailExiste: true} : null)
    );
  }

}