import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-driver-register-form',
  templateUrl: './driver-register-form.component.html',
  styleUrl: './driver-register-form.component.css',
})
export class DriverRegisterFormComponent {
  @Input() parentForm!: FormGroup;
  @Output() imagesData = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    console.log('parentForm: ', this.parentForm);
  }

  get f() {
    return this.parentForm.controls;
  }

  // Function to handle imagesData emitted by upload-images component
  onImagesSelect(imagesData: any) {
    this.imagesData.emit(imagesData);
  }
}
