import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// agent driver
import { LoginComponent } from './pages/agent-driver/login/login.component';
import { LayoutComponent } from './pages/agent-driver/layout/layout.component';
import { DashboardComponent } from './pages/agent-driver/dashboard/dashboard.component';
import { authGuard } from './services/auth.guard';
import { RegisterComponent } from './pages/agent-driver/register/register.component';
import { ForgotComponent } from './pages/agent-driver/forgot/forgot.component';
import { ResetComponent } from './pages/agent-driver/reset/reset.component';
import { PaymentComponent } from './pages/agent-driver/payment/payment.component';
import { PaymentSuccessComponent } from './pages/agent-driver/payment-success/payment-success.component';
import { OtpSendComponent } from './pages/agent-driver/otp-send/otp-send.component';
import { OtpVerifyComponent } from './pages/agent-driver/otp-verify/otp-verify.component';
import { AccountApprovalComponent } from './pages/agent-driver/account-approval/account-approval.component';
import { ResubmitImageComponent } from './pages/agent-driver/resubmit-image/resubmit-image.component';
import { AgentDriverPagenotfoundComponent } from './pages/agent-driver/agent-driver-pagenotfound/agent-driver-pagenotfound.component';

// admin
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { adminAuthGuard } from './services/admin-auth.guard';
import { AdminRegisterComponent } from './pages/admin/admin-register/admin-register.component';
import { AdminForgotComponent } from './pages/admin/admin-forgot/admin-forgot.component';
import { AdminResetComponent } from './pages/admin/admin-reset/admin-reset.component';
import { AdvertiserLoginComponent } from './pages/advertiser/advertiser-login/advertiser-login.component';
import { AdvertiserDashboardComponent } from './pages/advertiser/advertiser-dashboard/advertiser-dashboard.component';
import { AdvertiserLayoutComponent } from './pages/advertiser/advertiser-layout/advertiser-layout.component';
import { AdvertiserRegisterComponent } from './pages/advertiser/advertiser-register/advertiser-register.component';
import { AdvertiserForgotComponent } from './pages/advertiser/advertiser-forgot/advertiser-forgot.component';
import { AdvertiserResetComponent } from './pages/advertiser/advertiser-reset/advertiser-reset.component';
import { AdminPagenotfoundComponent } from './pages/admin/admin-pagenotfound/admin-pagenotfound.component';
import { AdvertiserPagenotfoundComponent } from './pages/advertiser/advertiser-pagenotfound/advertiser-pagenotfound.component';
import { AccountAgentDriverApprovalComponent } from './pages/admin/account-agent-driver-approval/account-agent-driver-approval.component';

// advertiser

const agentDriverRoutes: Routes = [
  {
    path: 'agent-driver/login',
    component: LoginComponent,
  },
  {
    path: 'agent-driver',
    redirectTo: 'agent-driver/login',
    pathMatch: 'full',
  },
  {
    path: 'agent-driver',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'agent-driver/register',
    component: RegisterComponent,
  },
  {
    path: 'agent-driver/forgot',
    component: ForgotComponent,
  },
  {
    path: 'agent-driver/reset/:token',
    component: ResetComponent,
  },
  {
    path: 'agent-driver/payment',
    component: PaymentComponent,
  },
  {
    path: 'agent-driver/success',
    component: PaymentSuccessComponent,
  },
  {
    path: 'agent-driver/otp-send',
    component: OtpSendComponent,
  },
  {
    path: 'agent-driver/otp-verify',
    component: OtpVerifyComponent,
  },
  {
    path: 'agent-driver/account-approval/:userId',
    component: AccountApprovalComponent,
    canActivate: [authGuard],
  },
  {
    path: 'agent-driver/resubmit-image/:userId',
    component: ResubmitImageComponent,
  },
  {
    path: 'agent-driver/pagenotfound',
    component: AgentDriverPagenotfoundComponent,
  },
];

const adminRoutes: Routes = [
  {
    path: 'admin/login',
    component: AdminLoginComponent,
  },
  {
    path: 'admin',
    redirectTo: 'admin/login',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminAuthGuard],
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        canActivate: [adminAuthGuard],
      },
    ],
  },
  {
    path: 'admin/register',
    component: AdminRegisterComponent,
  },
  {
    path: 'admin/forgot',
    component: AdminForgotComponent,
  },
  {
    path: 'admin/reset/:token',
    component: AdminResetComponent,
  },
  {
    path: 'admin/account-agent-driver-approval/:userId',
    component: AccountAgentDriverApprovalComponent,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'admin/pagenotfound',
    component: AdminPagenotfoundComponent,
  },
];

const advertiserRoutes: Routes = [
  {
    path: 'advertiser/login',
    component: AdvertiserLoginComponent,
  },
  {
    path: 'advertiser',
    redirectTo: 'advertiser/login',
    pathMatch: 'full',
  },
  {
    path: 'advertiser',
    component: AdvertiserLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: AdvertiserDashboardComponent,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'advertiser/register',
    component: AdvertiserRegisterComponent,
  },
  {
    path: 'advertiser/forgot',
    component: AdvertiserForgotComponent,
  },
  {
    path: 'advertiser/reset/:token',
    component: AdvertiserResetComponent,
  },
  {
    path: 'advertiser/pagenotfound',
    component: AdvertiserPagenotfoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(agentDriverRoutes), // Import agentDriverRoutes
    RouterModule.forRoot(adminRoutes), // Import adminRoutes
    RouterModule.forRoot(advertiserRoutes), // Import advertiserRoutes
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
