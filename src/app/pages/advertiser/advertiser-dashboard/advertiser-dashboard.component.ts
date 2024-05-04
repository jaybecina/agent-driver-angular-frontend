import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-advertiser-dashboard',
  templateUrl: './advertiser-dashboard.component.html',
  styleUrl: './advertiser-dashboard.component.css',
})
export class AdvertiserDashboardComponent {
  // // this fux are in the layout.component.ts not yet refactored
  // // because of rapid development
  // userList: any[] = [];
  // constructor(private userSrv: UserService) {}
  // ngOnInit() {
  //   this.getUsers();
  // }
  // getUsers() {
  //   this.userSrv.getUsers().subscribe((res: any) => {
  //     this.userList = res.data;
  //   });
  // }
}
