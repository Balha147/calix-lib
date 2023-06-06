import { Component, DebugElement } from '@angular/core';
import { CalixTooltipDirective } from './calix-tooltip.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <span calixTooltip="Test Tooltip"></span>
  `,
})
class TestCalixTooltipComponent {}

describe('CalixTooltipDirective', () => {
  let component: TestCalixTooltipComponent;
  let fixture: ComponentFixture<TestCalixTooltipComponent>;
  let element: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestCalixTooltipComponent,
      ],
      imports: [
        CalixTooltipDirective,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCalixTooltipComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(CalixTooltipDirective));
    fixture.detectChanges();
  });

  it('should create tooltip element', () => {
    expect(element.nativeElement.querySelector('.calix-tooltip')).toBeTruthy();
  });

  it('should show tooltip on mouseenter', () => {
    element.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();
    expect(element.nativeElement.querySelector('.calix-tooltip').style.visibility).toBe('visible');
  });

  it('should hide tooltip on mouseleave', () => {
    element.triggerEventHandler('mouseleave', null);
    fixture.detectChanges();
    expect(element.nativeElement.querySelector('.calix-tooltip').style.visibility).toBe('hidden');
  });
});
