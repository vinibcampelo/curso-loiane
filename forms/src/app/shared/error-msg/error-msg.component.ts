import { Component, Input } from '@angular/core';
import { FormValidations } from '../form-validation';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.css'
})
export class ErrorMsgComponent {

  @Input() control?: FormControl;
  @Input() label: string = "";

  get errorMessage(){
    console.log('entrou');
    console.log(this.label);
    console.log(this.control);
    
    
    for(const propertyName in this.control?.errors) {      
      if(this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }

}
