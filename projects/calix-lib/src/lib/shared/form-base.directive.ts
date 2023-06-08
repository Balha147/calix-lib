import { Directive, EventEmitter, Output } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";

@Directive()
export abstract class FormBaseDirective<T> implements ControlValueAccessor {
  protected innerValue!: T;

  @Output() valueChange: EventEmitter<T> = new EventEmitter<T>();

  get value(): T {
    return this.innerValue;
  }

  set value(value: T) {
    this.innerValue = value;
    this.onChange(this.innerValue);
    this.valueChange.emit(this.innerValue);
  }

  writeValue(value: any) {
    if (this.value === value) {
      return;
    }
    this.value = value;
    this.valueChange.emit(this.value);
  }

  registerOnChange(onChange: (value: T) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  onChange = (value: T): void => {
    /* needed by angular */
  };

  onTouched: () => void = () => {
    /* needed by angular */
  };
}
