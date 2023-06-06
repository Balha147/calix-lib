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
    this.onChangeCallback(this.innerValue);
    this.valueChange.emit(this.innerValue);
  }

  writeValue(value: any) {
    if (this.value === value) {
      return;
    }
    this.value = value;
    this.valueChange.emit(this.value);
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  private onChangeCallback: (_: any) => void = () => {};

  private onTouchedCallback: () => void = () => {};
}
