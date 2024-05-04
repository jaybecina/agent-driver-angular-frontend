import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-otp-send',
  templateUrl: './otp-send.component.html',
  styleUrl: './otp-send.component.css',
})
export class OtpSendComponent {
  router = inject(Router);
  toastr = inject(ToastrService);
  routeParams = inject(ActivatedRoute);

  phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required]),
  });

  phoneNumber: string = '';

  pageParam: string = '';

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  constructor(private otpSrv: OtpService) {}

  get f() {
    return this.phoneForm.controls;
  }

  ngOnInit() {
    this.isAuthenticated();

    // find the page url parameter
    this.pageParam = this.routeParams.snapshot.queryParams['page'];

    console.log(this.pageParam);
  }

  onInputChange($event: any) {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];

    console.log($event);
    this.phoneNumber = $event.phoneNumber;
  }

  title = 'intlInputNew';

  isAuthenticated() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null) {
      this.router.navigateByUrl('/agent-driver/dashboard');
    }
  }

  submit() {
    console.log('Inputted Phone Number:', this.phoneNumber);

    const otpSendPayload: any = {
      phoneNumber: this.phoneNumber,
    };

    if (otpSendPayload?.phoneNumber?.length < 8) {
      this.toastr.error('Enter correct phone number');
    }

    console.log('clean phoneNumber:', this.phoneNumber?.replace(/[\s+]/g, ''));

    this.otpSrv.onOTPSend(otpSendPayload).subscribe(
      (otpRes: any) => {
        console.log('otpRes: ', otpRes);
        this.toastr.success('New OTP sent successfully');
        this.router.navigateByUrl(
          `/agent-driver/otp-verify?page=${
            this.pageParam
          }&phone=${this.phoneNumber?.replace(/[\s+]/g, '')}`
        );
      },
      (otpError: any) => {
        console.error('Error registering user: ', otpError);
        this.toastr.error(otpError?.error?.message);
      }
    );
  }
}
