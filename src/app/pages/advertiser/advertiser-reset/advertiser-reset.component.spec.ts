import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiserResetComponent } from './advertiser-reset.component';

describe('AdvertiserResetComponent', () => {
  let component: AdvertiserResetComponent;
  let fixture: ComponentFixture<AdvertiserResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvertiserResetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertiserResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
