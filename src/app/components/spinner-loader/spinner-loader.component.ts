import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpinnerLoaderService } from '../../services/spinner-loader.service';

@Component({
  selector: 'app-spinner-loader',
  templateUrl: './spinner-loader.component.html',
  styleUrl: './spinner-loader.component.css',
})
export class SpinnerLoaderComponent {
  showSpinner = false;

  constructor(
    private spinnerLoaderService: SpinnerLoaderService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.spinnerLoaderService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = status === 'start';
      this.cdRef.detectChanges();
    });
  }
}
