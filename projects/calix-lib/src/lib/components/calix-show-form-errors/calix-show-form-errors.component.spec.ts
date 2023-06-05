import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalixShowFormErrorsComponent } from './calix-show-form-errors.component';
import { FormControl, Validators } from '@angular/forms';

describe('CalixShowFormErrorsComponent', () => {
  let component: CalixShowFormErrorsComponent;
  let fixture: ComponentFixture<CalixShowFormErrorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalixShowFormErrorsComponent]
    });
    fixture = TestBed.createComponent(CalixShowFormErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show errors when control is null', () => {
    component.control = null;
    expect(component.shouldShowErrors()).toBeFalsy();
  });

  it('should not show errors when control has no errors', () => {
    const control = new FormControl('test', Validators.required);
    component.control = control;
    expect(component.shouldShowErrors()).toBeFalsy();
  });

  it('should show errors when control has errors and is dirty', () => {
    const control = new FormControl('', Validators.required);
    control.markAsDirty();
    component.control = control;
    expect(component.shouldShowErrors()).toBeTruthy();
  });

  it('should show errors when control has errors and is touched', () => {
    const control = new FormControl('', Validators.required);
    control.markAsTouched();
    component.control = control;
    expect(component.shouldShowErrors()).toBeTruthy();
  });

  it('should return an empty array when control has no errors', () => {
    const control = new FormControl('test', Validators.required);
    component.control = control;
    expect(component.listOfErrors()).toEqual([]);
  });

  it('should return an array of error messages when control has errors', () => {
    const control = new FormControl('', Validators.required);
    component.control = control;
    control.markAsDirty();
    expect(component.listOfErrors()).toEqual(['Ce champ est obligatoire']);
  });
});
