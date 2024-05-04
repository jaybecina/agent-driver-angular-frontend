import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRegisterFormComponent } from './vehicle-register-form.component';

describe('VehicleRegisterFormComponent', () => {
  let component: VehicleRegisterFormComponent;
  let fixture: ComponentFixture<VehicleRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleRegisterFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
