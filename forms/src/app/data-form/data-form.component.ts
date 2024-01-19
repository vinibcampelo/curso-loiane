import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br.model';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Observable } from 'rxjs';
import { FormValidations } from '../shared/form-validation';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.css'
})
export class DataFormComponent implements OnInit {
  formulario: FormGroup;
  estados: Observable<EstadoBr[]> =  new Observable();
  cargos?: any[];
  tecnologias?: any[];
  newsletters?: any[];
  frameworks: string[] = ['Angular', 'React', 'Vue', 'Sencha']

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

    this.estados = this.dropdownService.getEstadosBr();
    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsletters = this.dropdownService.getNewsLetter();
  }

  onSubmit(){
    let valueSubmit = Object.assign({}, this.formulario.value)

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
      .map((v: any, i: any) => v ? this.frameworks[i] : null)
      .filter((v: any) => v !== null)
    })
    if(this.formulario.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
      .subscribe({
        next: dados => console.log(dados),
        error: (error) => alert("Algo não esperado ocorreu"),
        complete: () => this.formulario.reset()
      });
    } else {
      // this.formulario.markAllAsTouched();
      this.verificaValidacoesForm(this.formulario)
    }
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
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
    if(campo === 'confirmarEmail' || campo === 'email') {
      console.log(this.formulario);
      console.log('(this.verificaInvalidTouched(campoForm)) ==' + (this.verificaInvalidTouched(campoForm)));
      console.log('campo.invalid = ' + campoForm?.invalid);
      
    }
    
    
    
    if (this.verificaInvalidTouched(campoForm)) {
      return 'is-invalid'
    } else if(this.verificaValidTouched(campoForm)) {
      return 'is-valid'
    }
    return ''    
  }

  verificaRequired(campo: string) {
    return this.formulario.get(campo)?.hasError('required')
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

}
