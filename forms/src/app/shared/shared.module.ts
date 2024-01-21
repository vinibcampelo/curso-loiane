import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { DropdownService } from './services/dropdown.service';
import { ErrorMsgComponent } from './error-msg/error-msg.component';



@NgModule({
  declarations: [
    FormDebugComponent,
    ErrorMsgComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormDebugComponent,
    ErrorMsgComponent
  ],
  providers: [
    DropdownService
  ]
})
export class SharedModule { }
