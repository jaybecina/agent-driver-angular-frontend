import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { customInterceptor } from './services/custom.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxIntlTelephoneInputModule } from 'ngx-intl-telephone-input';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from '../environments/environment.development';

// agent driver
import { LoginComponent } from './pages/agent-driver/login/login.component';
import { DashboardComponent } from './pages/agent-driver/dashboard/dashboard.component';
import { LayoutComponent } from './pages/agent-driver/layout/layout.component';
import { RegisterComponent } from './pages/agent-driver/register/register.component';
import { ForgotComponent } from './pages/agent-driver/forgot/forgot.component';
import { ResetComponent } from './pages/agent-driver/reset/reset.component';
import { PaymentComponent } from './pages/agent-driver/payment/payment.component';
import { PaymentSuccessComponent } from './pages/agent-driver/payment-success/payment-success.component';
import { PaymentCancelComponent } from './pages/agent-driver/payment-cancel/payment-cancel.component';
import { OtpSendComponent } from './pages/agent-driver/otp-send/otp-send.component';
import { OtpVerifyComponent } from './pages/agent-driver/otp-verify/otp-verify.component';
import { AccountApprovalComponent } from './pages/agent-driver/account-approval/account-approval.component';
import { ResubmitImageComponent } from './pages/agent-driver/resubmit-image/resubmit-image.component';
import { UserRegisterFormComponent } from './components/user-register-form/user-register-form.component';
import { DriverRegisterFormComponent } from './components/driver-register-form/driver-register-form.component';
import { VehicleRegisterFormComponent } from './components/vehicle-register-form/vehicle-register-form.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminForgotComponent } from './pages/admin/admin-forgot/admin-forgot.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { AdminRegisterComponent } from './pages/admin/admin-register/admin-register.component';
import { AdminResetComponent } from './pages/admin/admin-reset/admin-reset.component';
import { AdvertiserDashboardComponent } from './pages/advertiser/advertiser-dashboard/advertiser-dashboard.component';
import { AdvertiserForgotComponent } from './pages/advertiser/advertiser-forgot/advertiser-forgot.component';
import { AdvertiserLayoutComponent } from './pages/advertiser/advertiser-layout/advertiser-layout.component';
import { AdvertiserLoginComponent } from './pages/advertiser/advertiser-login/advertiser-login.component';
import { AdvertiserRegisterComponent } from './pages/advertiser/advertiser-register/advertiser-register.component';
import { AdvertiserResetComponent } from './pages/advertiser/advertiser-reset/advertiser-reset.component';
import { AdminPagenotfoundComponent } from './pages/admin/admin-pagenotfound/admin-pagenotfound.component';
import { AdvertiserPagenotfoundComponent } from './pages/advertiser/advertiser-pagenotfound/advertiser-pagenotfound.component';
import { AgentDriverPagenotfoundComponent } from './pages/agent-driver/agent-driver-pagenotfound/agent-driver-pagenotfound.component';
import { AccountAgentDriverApprovalComponent } from './pages/admin/account-agent-driver-approval/account-agent-driver-approval.component';
import { SpinnerLoaderComponent } from './components/spinner-loader/spinner-loader.component';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';
import { StepperProgressbarComponent } from './components/stepper-progressbar/stepper-progressbar.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { ScreenInstallFormComponent } from './components/screen-install-form/screen-install-form.component';

// admin

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    RegisterComponent,
    ForgotComponent,
    ResetComponent,
    PaymentComponent,
    PaymentSuccessComponent,
    PaymentCancelComponent,
    OtpSendComponent,
    OtpVerifyComponent,
    AccountApprovalComponent,
    ResubmitImageComponent,
    UserRegisterFormComponent,
    DriverRegisterFormComponent,
    VehicleRegisterFormComponent,
    AdminDashboardComponent,
    AdminForgotComponent,
    AdminLayoutComponent,
    AdminLoginComponent,
    AdminRegisterComponent,
    AdminResetComponent,
    AdvertiserDashboardComponent,
    AdvertiserForgotComponent,
    AdvertiserLayoutComponent,
    AdvertiserLoginComponent,
    AdvertiserRegisterComponent,
    AdvertiserResetComponent,
    AdminPagenotfoundComponent,
    AdvertiserPagenotfoundComponent,
    AgentDriverPagenotfoundComponent,
    AccountAgentDriverApprovalComponent,
    SpinnerLoaderComponent,
    UploadImagesComponent,
    StepperProgressbarComponent,
    PaymentFormComponent,
    ScreenInstallFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxIntlTelephoneInputModule,
    NgxOtpInputModule,
    ToastrModule.forRoot(),
    NgxStripeModule.forRoot(`${environment.stripePublishableKey}`),
  ],
  providers: [
    provideHttpClient(withInterceptors([customInterceptor])),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
