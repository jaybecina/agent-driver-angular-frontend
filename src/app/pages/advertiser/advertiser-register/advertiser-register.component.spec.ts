import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiserRegisterComponent } from './advertiser-register.component';

describe('AdvertiserRegisterComponent', () => {
  let component: AdvertiserRegisterComponent;
  let fixture: ComponentFixture<AdvertiserRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvertiserRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertiserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
