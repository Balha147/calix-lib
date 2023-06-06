import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalixInputComponent } from './calix-input.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CalixInputComponent', () => {
  let component: CalixInputComponent;
  let fixture: ComponentFixture<CalixInputComponent>;
  let inputElement: DebugElement;

  beforeEach(() => {

    fixture = TestBed.createComponent(CalixInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial change detection
    inputElement = fixture.debugElement.query(By.css('input'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear value if input equals "calix-"', () => {
    const input = inputElement.nativeElement;
    input.value = 'calix-';
    input.dispatchEvent(new Event('input'));

    expect(component.value).toEqual('');
  });

  it('should prepend "calix-" if input does not start with it', () => {
    const input = inputElement.nativeElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input'));

    expect(component.value).toEqual('calix-test');
  });

  it('should keep the same value if input starts with "calix-"', () => {
    const input = inputElement.nativeElement;
    input.value = 'calix-test';
    input.dispatchEvent(new Event('input'));

    expect(component.value).toEqual('calix-test');
  });

});
