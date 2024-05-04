import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRegisterFormComponent } from './driver-register-form.component';

describe('DriverRegisterFormComponent', () => {
  let component: DriverRegisterFormComponent;
  let fixture: ComponentFixture<DriverRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriverRegisterFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriverRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
