import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent {
  formulario!: FormGroup;

  abstract submit(): any;

  onSubmit(){
    if(this.formulario.valid) {
      this.submit();
    } else {
      // this.formulario.markAllAsTouched();
      this.verificaValidacoesForm(this.formulario)
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);

      controle?.markAsDirty();
      controle?.markAsTouched();

      if(controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle)
      }
    });
  }

  resetar() {
    this.formulario.reset()
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

  aplicaValidacao(campo: string) {
    const campoForm = this.formulario.get(campo);    
    if (this.verificaInvalidTouched(campoForm)) {
      return 'is-invalid'
    } else if(this.verificaValidTouched(campoForm)) {
      return 'is-valid'
    }
    return ''    
  }
}
