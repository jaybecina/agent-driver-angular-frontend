import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenInstallFormComponent } from './screen-install-form.component';

describe('ScreenInstallFormComponent', () => {
  let component: ScreenInstallFormComponent;
  let fixture: ComponentFixture<ScreenInstallFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScreenInstallFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScreenInstallFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
