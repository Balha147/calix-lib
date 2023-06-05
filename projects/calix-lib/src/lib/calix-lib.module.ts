import { NgModule } from '@angular/core';
import { CalixInputComponent } from './components/calix-input/calix-input.component';
import { CalixTooltipDirective } from './components/calix-tooltip/directive/calix-tooltip.directive';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CalixShowFormErrorsComponent } from './components/calix-show-form-errors/calix-show-form-errors.component';

@NgModule({
  declarations: [
    CalixInputComponent,
    CalixTooltipDirective,
    CalixShowFormErrorsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  exports: [
    CalixInputComponent,
    CalixTooltipDirective,
    CalixShowFormErrorsComponent,
  ],
})
export class CalixLibModule { }
