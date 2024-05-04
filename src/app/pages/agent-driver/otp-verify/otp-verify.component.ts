import { Component, ViewChild, inject } from '@angular/core';
import { OtpService } from '../../../services/otp.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-telephone-input';
import { NgxOtpInputComponent, NgxOtpInputConfig } from 'ngx-otp-input';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrl: './otp-verify.component.css',
})
export class OtpVerifyComponent {
  @ViewChild('ngxOtpInput') ngOtpInput: NgxOtpInputComponent | undefined;

  router = inject(Router);
  toastr = inject(ToastrService);
  routeParams = inject(ActivatedRoute);

  phoneParam: string = '';
  pageParam: string = '';

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  otpVerifyForm = new FormGroup({
    phone: new FormControl('', [Validators.required]),
    otp: new FormControl('', [Validators.required]),
  });

  constructor(private otpSrv: OtpService) {}

  get f() {
    return this.otpVerifyForm.controls;
  }

  ngOnInit() {
    this.isAuthenticated();

    // find the page url parameter
    this.pageParam = this.routeParams.snapshot.queryParams['page'];
    this.phoneParam = this.routeParams.snapshot.queryParams['phone'];

    console.log(this.pageParam);
  }

  title = 'intlInputNew';

  isAuthenticated() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null) {
      this.router.navigateByUrl('/agent-driver/dashboard');
    }
  }

  handeOtpChange(value: string[]): void {
    const otpValue: string = value.join(''); // Join the array into a single string
    console.log(otpValue);

    this.otpVerifyForm.patchValue({
      otp: otpValue,
    });
  }

  handleFillEvent(value: string): void {
    console.log(value);
  }

  isOTPFormFieldNotEmpty(): boolean {
    const controls = this.otpVerifyForm.controls;
    // Check if all form fields from 'firstName' to 'role' are not empty
    return controls['otp'].value !== '';
  }

  submit() {
    console.log('Inputted Phone Number:', this.phoneParam);

    if (!this.isOTPFormFieldNotEmpty()) {
      this.toastr.error('OTP cannot be empty!');
      return;
    }

    const otpSendPayload: any = {
      phoneNumber: `+${this.phoneParam}`,
      otp: this.otpVerifyForm.value.otp,
    };

    console.log('otpSendPayload:', otpSendPayload);

    this.otpSrv.onOTPVerify(otpSendPayload).subscribe(
      (otpRes: any) => {
        console.log('otpRes: ', otpRes);
        this.toastr.success('OTP verified successfully');
        localStorage.setItem(
          'otpVerified',
          JSON.stringify(otpRes.data?.otpVerified)
        );
        this.router.navigateByUrl(`/agent-driver/${this.pageParam}`);
      },
      (otpError: any) => {
        console.error('Error registering user: ', otpError);
        this.toastr.error(otpError?.error?.message);
      }
    );
  }
}
