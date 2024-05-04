import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { DriverService } from '../../services/driver.service';
import { VehicleService } from '../../services/vehicle.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register-form',
  templateUrl: './user-register-form.component.html',
  styleUrl: './user-register-form.component.css',
})
export class UserRegisterFormComponent {
  @Input() parentForm!: FormGroup;

  constructor() {}

  ngOnInit() {
    console.log('parentForm: ', this.parentForm);
  }

  get f() {
    return this.parentForm.controls;
  }
}
