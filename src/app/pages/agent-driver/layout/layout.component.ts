import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  router = inject(Router);
  toastr = inject(ToastrService);

  userList: any[] = [];

  email: any = 'jose@gmail.com';

  constructor(private userSrv: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  //Sidebar toggle show hide function
  status = false;
  addToggle() {
    this.status = !this.status;
  }

  onLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('otpVerified');
    this.router.navigateByUrl('/agent-driver/login');
    this.toastr.success('Logout successful');
  }

  getUsers() {
    this.userSrv.getUsers().subscribe((res: any) => {
      this.userList = res.data;
    });
  }
}
