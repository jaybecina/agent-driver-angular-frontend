import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const routeParams = inject(ActivatedRoute);
  let isLoggedIn = localStorage.getItem('accessToken');
  let userString: string = localStorage.getItem('user')!;
  const user: any = JSON.parse(userString);

  const onLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('otpVerified');
    router.navigateByUrl('/admin/login');
    toastr.success('Logout successful');
  };

  if (isLoggedIn !== null) {
    if (user?.user.role !== 'ADMIN') {
      console.log('user.user.role: ', user.user.role);
      onLogout();
      toastr.error('Access denied. Invalid Role. Redirecting to login page.');
      router.navigateByUrl(`/admin/login`);
      return false;
    }

    return true;
  } else {
    toastr.error('Access denied. Unauthenticated. Redirecting to login page.');

    router.navigateByUrl(`/admin/login`);
    return false;
  }
};
