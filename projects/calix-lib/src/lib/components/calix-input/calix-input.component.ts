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
      this.onChangeCallback(this.innerValue);
      this.valueChange.emit(this.innerValue);
    }
  }

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim();
    if (value === 'calix-') {
      this.value = '';
    } else if (!value.startsWith('calix-')) {
      this.value = value ? `calix-${value}` : '';
    } else {
      this.value = value;
    }
  }



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

  private onChangeCallback: (_: any) => void = () => {};

  onTouchedCallback: () => void = () => {};
}
