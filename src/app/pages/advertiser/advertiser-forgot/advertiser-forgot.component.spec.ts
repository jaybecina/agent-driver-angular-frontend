import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiserForgotComponent } from './advertiser-forgot.component';

describe('AdvertiserForgotComponent', () => {
  let component: AdvertiserForgotComponent;
  let fixture: ComponentFixture<AdvertiserForgotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvertiserForgotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertiserForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
