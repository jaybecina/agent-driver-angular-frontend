import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAgentDriverApprovalComponent } from './account-agent-driver-approval.component';

describe('AccountAgentDriverApprovalComponent', () => {
  let component: AccountAgentDriverApprovalComponent;
  let fixture: ComponentFixture<AccountAgentDriverApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountAgentDriverApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountAgentDriverApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
