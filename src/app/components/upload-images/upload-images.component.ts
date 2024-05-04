import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrl: './upload-images.component.css',
})
export class UploadImagesComponent {
  @Input() parentForm!: FormGroup;

  imagesArr: File[] = [];
  previewImages: any = [];
  @Output() imagesData: any = new EventEmitter<any>();

  get f() {
    return this.parentForm.controls;
  }

  onFileChange(event: any) {
    console.log('onFileChange');
    if (event.target.files.length > 0) {
      // emits the data to the parent which is register component
      this.imagesData.emit(Array.from(event.target.files));

      // Clear previous preview images
      this.previewImages = [];

      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          // console.log("preview images: ", event.target.result);
          this.previewImages.push(event.target.result);
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
}
