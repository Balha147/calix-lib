import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CalixInputModel } from './model/calix-input.model';

@Component({
  selector: 'calix-input',
  templateUrl: './calix-input.component.html',
  styleUrls: ['./calix-input.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: CalixInputComponent, multi: true },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalixInputComponent implements ControlValueAccessor {
  @Input() options: CalixInputModel = {
    label: '',
    readonly: false,
    placeholder: 'Placeholder',
  };

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  private innerValue = '';

  get value(): string {
    return this.innerValue;
  }

  set value(value: string) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.onChangeCallback(this.innerValue); // rappel `onChangeCallback` pour informer les autres composants du changement de valeur
      this.valueChange.emit(this.innerValue); // emettre la nouvelle valeur
    }
  }

  /**
   * concaténer la valeur par le prefix `calix-`
   * @param event
   */
  onInputChange(event: Event) {
    const { value } = event.target as HTMLInputElement;
    if (value === 'calix-') {
      this.value = '';
    } else {
      const trimmedValue = value.trim();
      const startsWithCalix = trimmedValue.startsWith('calix-');
      this.value = startsWithCalix ? trimmedValue : `calix-${trimmedValue}`;
    }
  }

  /*--------------- Start ControlValueAccessor ------------------*/
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
 /*--------------- End ControlValueAccessor ------------------*/

  private onChangeCallback: (_: any) => void = () => {}; // un rappel appelé lorsqu'il y a un changement de valeur

  onTouchedCallback: () => void = () => {}; // rappel appelé lorsqu'il y a une interaction de l'utilisateur
}
