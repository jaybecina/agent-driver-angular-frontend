import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { DriverService } from '../../services/driver.service';
import { VehicleService } from '../../services/vehicle.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicle-register-form',
  templateUrl: './vehicle-register-form.component.html',
  styleUrl: './vehicle-register-form.component.css',
})
export class VehicleRegisterFormComponent {
  @Input() parentForm!: FormGroup;

  constructor() {}

  ngOnInit() {
    console.log('parentForm: ', this.parentForm);
  }

  get f() {
    return this.parentForm.controls;
  }
}
