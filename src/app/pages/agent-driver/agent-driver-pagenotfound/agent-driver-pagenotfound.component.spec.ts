import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDriverPagenotfoundComponent } from './agent-driver-pagenotfound.component';

describe('AgentDriverPagenotfoundComponent', () => {
  let component: AgentDriverPagenotfoundComponent;
  let fixture: ComponentFixture<AgentDriverPagenotfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentDriverPagenotfoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentDriverPagenotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
