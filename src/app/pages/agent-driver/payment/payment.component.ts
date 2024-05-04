import { Component, inject } from '@angular/core';
import { StripeService } from '../../../services/stripe.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  router = inject(Router);
  toastr = inject(ToastrService);
  routeParams = inject(ActivatedRoute);

  stripe: any;
  cardElement: any;

  currentStep: number = 0;

  paymentForm = new FormGroup({
    paymentElement: new FormControl('', [Validators.required]),
    paymentPlan: new FormControl('', [Validators.required]),
  });

  constructor(private stripeService: StripeService) {}

  async onRedirectToPayment() {
    const model = {
      productName: 'Screen Model 1',
      productDescription: 'Roof Screen Size 50 inches',
      productPrice: 200,
    };

    // const model = {
    //   priceId: 'price_1P4SDAG9KASkEPLwOjZTNeBr',
    // };

    await this.stripeService.redirectToPayment(model);
  }

  goto(url: string) {
    if (url !== null) {
      this.router.navigateByUrl(url);
    }
  }

  isUserFormFieldsNotEmpty(): boolean {
    const controls = this.paymentForm.controls;
    // Check if all form fields from 'firstName' to 'role' are not empty
    return (
      controls['paymentElement'].value !== '' &&
      controls['paymentPlan'].value !== ''
    );
  }

  previousStep(event: Event) {
    event.preventDefault();

    if (this.currentStep === 1) {
      console.log('previousStep');
      this.currentStep = 0;
    }

    window.scrollTo(0, 0);
  }

  nextStep(event: Event) {
    event.preventDefault();

    const isNotEmpty = this.isUserFormFieldsNotEmpty();

    if (isNotEmpty && this.currentStep === 0) {
      console.log('nextStep true');
      this.currentStep = 1;
    } else {
      console.log('nextStep false');
      this.toastr.error('Please fill all the required fields');
      return;
    }

    window.scrollTo(0, 0);
  }

  submit() {}
}
