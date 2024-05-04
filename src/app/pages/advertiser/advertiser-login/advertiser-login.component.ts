import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-advertiser-login',
  templateUrl: './advertiser-login.component.html',
  styleUrl: './advertiser-login.component.css',
})
export class AdvertiserLoginComponent {
  loginObj: any = {
    email: '',
    password: '',
  };

  router = inject(Router);
  toastr = inject(ToastrService);
  routeParams = inject(ActivatedRoute);

  roleUrl: string = '';

  constructor(private userSrv: UserService) {}

  ngOnInit() {
    this.isAuthenticated();
    this.isOTPVerified();
  }

  goto(url: string) {
    if (url !== null) {
      this.router.navigateByUrl(url);
    }
  }

  isOTPVerified() {
    const otpVerified = localStorage.getItem('otpVerified');
    if (otpVerified !== null) {
      this.router.navigateByUrl('/advertiser/login');
    } else {
      this.router.navigateByUrl('/advertiser/otp-send?page=login');
    }
  }

  isAuthenticated() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null) {
      this.router.navigateByUrl('/advertiser/dashboard');
    }
  }

  onLogin() {
    this.userSrv.onLogin(this.loginObj).subscribe(
      (res: any) => {
        if (res.result) {
          localStorage.setItem('user', JSON.stringify(res.data));
          localStorage.setItem(
            'accessToken',
            JSON.stringify(res.data?.accessToken)
          );
          localStorage.setItem(
            'refreshToken',
            JSON.stringify(res.data?.refreshToken)
          );
          this.router.navigateByUrl('/advertiser/dashboard');
        } else {
          this.toastr.error(res.message);
        }
      },
      (error: any) => {
        console.log('login error: ', error?.error);
        // this.toastr.error(error?.error);
      }
    );
  }
}
