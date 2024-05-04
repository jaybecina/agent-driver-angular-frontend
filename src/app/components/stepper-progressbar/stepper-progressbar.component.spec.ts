import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperProgressbarComponent } from './stepper-progressbar.component';

describe('StepperProgressbarComponent', () => {
  let component: StepperProgressbarComponent;
  let fixture: ComponentFixture<StepperProgressbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepperProgressbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepperProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
