import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-screen-install-form',
  templateUrl: './screen-install-form.component.html',
  styleUrl: './screen-install-form.component.css',
})
export class ScreenInstallFormComponent {
  @Input() parentForm!: FormGroup;

  ngOnInit() {
    console.log('parentForm: ', this.parentForm);
  }

  get f() {
    return this.parentForm.controls;
  }
}
