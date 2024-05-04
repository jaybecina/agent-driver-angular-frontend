import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiserPagenotfoundComponent } from './advertiser-pagenotfound.component';

describe('AdvertiserPagenotfoundComponent', () => {
  let component: AdvertiserPagenotfoundComponent;
  let fixture: ComponentFixture<AdvertiserPagenotfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvertiserPagenotfoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertiserPagenotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
