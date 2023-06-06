import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CalixInputModel } from './model/calix-input.model';
import { NgIf } from '@angular/common';
import { FormBaseDirective } from '../../shared/form-base.directive';

@Component({
  selector: 'calix-input',
  templateUrl: './calix-input.component.html',
  styleUrls: ['./calix-input.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: CalixInputComponent, multi: true },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf],
})
export class CalixInputComponent extends FormBaseDirective<string> {
  @Input() options: CalixInputModel = {
    label: '',
    readonly: false,
    placeholder: 'Placeholder',
  };

  onInputChange(event: Event) {
    const { value } = event.target as HTMLInputElement;
    const trimmedValue = value.trim();
    const newValue =
      trimmedValue === 'calix-'
        ? ''
        : trimmedValue.startsWith('calix-')
        ? trimmedValue
        : `calix-${trimmedValue}`;
    this.value = newValue;
  }
}
