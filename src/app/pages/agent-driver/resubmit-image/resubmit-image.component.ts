import { Component, inject } from '@angular/core';
import { ResubmitImageService } from '../../../services/resubmit-image.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DriverService } from '../../../services/driver.service';

@Component({
  selector: 'app-resubmit-image',
  templateUrl: './resubmit-image.component.html',
  styleUrl: './resubmit-image.component.css',
})
export class ResubmitImageComponent {
  router = inject(Router);
  toastr = inject(ToastrService);
  routeParams = inject(ActivatedRoute);

  paramUserId: any = null;
  userAccountInfo: any = null;
  disableButton: boolean = false;

  imagesArr: File[] = [];
  previewImages: any = [];

  resubmitImageForm = new FormGroup({
    images: new FormControl(null, [Validators.required]),
  });

  constructor(
    private resubmitSrv: ResubmitImageService,
    private driverSrv: DriverService
  ) {}

  ngOnInit() {
    // find the page url parameter
    this.getParamId();

    this.getAccountInfo(this.paramUserId);
  }

  getParamId() {
    this.paramUserId = this.routeParams.snapshot.paramMap.get('userId');
    console.log('Param ID:', this.paramUserId);
  }

  getAccountInfo(paramUserId: any) {
    console.log('getAccountInfo paramUserId: ', paramUserId);
    this.resubmitSrv.onGetAccount(parseInt(paramUserId)).subscribe(
      (userRes: any) => {
        console.log('accountData: ', userRes);

        if (!userRes) {
          this.disableButton = true;
          this.toastr.error('This account do not exists!');
        }

        if (
          userRes?.data?.status &&
          userRes?.data?.status !== 'VERIFICATION_PENDING!'
        ) {
          this.disableButton = true;
          this.toastr.error('The status account is not VERIFICATION_PENDING!');
        }

        this.userAccountInfo = userRes?.data?.account;
      },
      (approvalError: any) => {
        console.error('Error registering user: ', approvalError?.error?.error);
        this.toastr.error(approvalError?.error?.error);
      }
    );
  }

  get f() {
    return this.resubmitImageForm.controls;
  }

  onFileChange(event: any) {
    console.log('onFileChange');
    if (event.target.files.length > 0) {
      this.imagesArr = Array.from(event.target.files);

      // Clear previous preview images
      this.previewImages = [];

      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.previewImages.push(event.target.result);
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  submit() {
    console.log('userAccountInfo: ', this.userAccountInfo);
    console.log('this.paramUserId: ', this.paramUserId);

    console.log(this.resubmitImageForm.value);
    console.log('previewImages: ', this.previewImages);

    if (this.resubmitImageForm.invalid) {
      // here potentially add some visual feedback for a user
      console.log('Please fill all the required fields');
      this.toastr.error('Please fill all the required fields');
      return;
    }

    /** Upload Images merge form group data with image */
    const formData = new FormData();

    // Append form fields to FormData
    Object.keys(this.resubmitImageForm.controls).forEach((key) => {
      const controlValue = this.resubmitImageForm.get(key)?.value;
      formData.append(key, controlValue);
    });

    console.log('submit this.imagesArr: ', this.imagesArr);

    this.imagesArr.forEach((image) => {
      console.log('imagesSource: ', image);
      formData.append('imagesSource', image);
    });

    console.log('formData: ', formData);
    /** End Upload Images merge form group data with image */

    this.driverSrv.onDeleteImage(this.paramUserId).subscribe(
      (deleteRes: any) => {
        console.log('deleteRes: ', deleteRes);

        if (deleteRes && this.resubmitImageForm.value) {
          formData.append('userId', this.paramUserId);

          this.resubmitSrv
            .onResubmitImage(formData)
            .subscribe((resubmitRes: any) => {
              console.log('resubmitRes: ', resubmitRes);

              const emailResubmitPayload = {
                userId: parseInt(this.paramUserId),
              };

              if (resubmitRes) {
                console.log('before email resubmitRes: ', resubmitRes);
                this.resubmitSrv
                  .onEmailResubmittedImage(emailResubmitPayload)
                  .subscribe((emailResubmitRes: any) => {
                    console.log('emailResubmitRes: ', emailResubmitRes);
                    this.toastr.success(
                      'Resubmission of image successful and email has sent to the approver. Please check your email daily for approval of your account'
                    );
                    this.router.navigateByUrl('/agent-driver/login');
                  }),
                  (emailResubmitError: any) => {
                    console.error(
                      'Error Email Resubmission of image: ',
                      emailResubmitError
                    );
                  };
              }
            }),
            (resubmitResError: any) => {
              console.error('Error Resubmission of image: ', resubmitResError);
            };
        }
      },
      (approvalError: any) => {
        console.error('Error registering user: ', approvalError);
        this.toastr.error(approvalError?.error?.message);
      }
    );
  }
}

// this.toastr.success(
//   `Account of ${this.accountData?.email} ${this.resubmitImageForm.value?.status} successfully`
// );
