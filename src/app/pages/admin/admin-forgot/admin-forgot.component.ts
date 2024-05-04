import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-forgot',
  templateUrl: './admin-forgot.component.html',
  styleUrl: './admin-forgot.component.css',
})
export class AdminForgotComponent {
  forgotObj: any = {
    email: '',
  };

  router = inject(Router);
  toastr = inject(ToastrService);
  routeParams = inject(ActivatedRoute);

  roleUrl: string = '';

  constructor(private userSrv: UserService) {}

  ngOnInit() {
    this.isAuthenticated();
  }

  isAuthenticated() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null) {
      this.router.navigateByUrl('/admin/dashboard');
    }
  }

  goto(url: string) {
    if (url !== null) {
      this.router.navigateByUrl(url);
    }
  }

  onForgot() {
    console.log('onForgot');
    this.userSrv.onForgot(this.forgotObj).subscribe(
      (res: any) => {
        console.log('success');
        this.toastr.success(
          'An email to reset your password has been successfully sent.'
        );
        this.router.navigateByUrl('/admin/login');
      },
      (error: any) => {
        // Check if error object and error.error object exist
        // this.toastr.error(error?.error?.message);
      }
    );
  }
}
