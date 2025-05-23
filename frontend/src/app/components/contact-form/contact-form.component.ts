import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { RecaptchaComponent, RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

import { environment } from '../../../environments/environment';
import { strings } from '../../misc';
import { ContactFormFacade, ToastService } from '../../services';
import { ContactFormService } from '../../services/contact-form.service';
import { FormField } from '../../types';
import { CustomValidators } from '../../validators/custom.validators';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    CommonModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ContactFormService, ContactFormFacade, ToastService]
})
export class ContactFormComponent implements OnInit {
  @ViewChild('reCaptcha') reCaptchaComponent: RecaptchaComponent;

  fields: FormField[];
  form: UntypedFormGroup;
  saving = false;
  siteKey = environment.recaptchaSiteKey;
  strings = strings.contactForm;

  get recaptchaControl(): UntypedFormControl {
    return this.form.get('recaptcha') as UntypedFormControl;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private contactFormFacade: ContactFormFacade,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.prepareFields();
    this.buildForm();
  }

  private prepareFields(): void {
    this.fields = [
      {
        name: 'full_name',
        label: this.strings.fields.full_name.label,
        placeholder: this.strings.fields.full_name.placeholder,
        type: 'text',
        required: true
      },
      {
        name: 'email',
        label: this.strings.fields.email.label,
        placeholder: this.strings.fields.email.placeholder,
        type: 'email',
        required: true
      },
      {
        name: 'phone_number',
        label: this.strings.fields.phone_number.label,
        placeholder: this.strings.fields.phone_number.placeholder,
        type: 'tel',
        required: false
      },
      {
        name: 'description',
        label: this.strings.fields.description.label,
        placeholder: this.strings.fields.description.placeholder,
        type: 'text',
        required: true
      }
    ];
  }

  private buildForm(): void {
    this.form = new UntypedFormGroup({
      full_name: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      phone_number: new UntypedFormControl('', CustomValidators.phone),
      description: new UntypedFormControl('', Validators.required),
      recaptcha: new UntypedFormControl(null, Validators.required)
    });
  }

  hasErrorMessage(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    if (!control) return false;

    return control.hasError('required') || control.hasError('email') || control.hasError('phoneNumber') || control.hasError('backend');
  }

  getErrorMessage(fieldName: string): string | null {
    const control = this.form.get(fieldName);
    if (!control) return null;

    if (control.hasError('required')) {
      return this.strings.errors.required;
    }
    if (control.hasError('email')) {
      return this.strings.errors.email;
    }
    if (control.hasError('phoneNumber')) {
      return this.strings.errors.phoneNumber;
    }
    if (control.hasError('backend')) {
      return control.getError('backend');
    }
    return null;
  }

  private resetForm(): void {
    this.fields.forEach(field => {
      this.form.get(field.name).reset(null, { emitEvent: false });
    });
  }

  onRecaptchaResolved(captchaResponse: string): void {
    this.form.get('recaptcha').setValue(captchaResponse);
    this.cdr.markForCheck();
  }

  submit(event: Event): void {
    event.preventDefault();

    this.saving = true;
    this.contactFormFacade.sendContactForm(this.form.value).subscribe({
      next: () => {
        this.saving = false;
        this.resetForm();
        this.toastService.showSuccessMessage(this.strings.sendEmail.success);
        this.cdr.markForCheck();
      },
      error: (error: HttpErrorResponse) => {
        this.saving = false;
        if (error.error && error.error.errors && typeof error.error.errors === 'object') {
          Object.keys(error.error.errors).forEach(field => {
            if (this.form.get(field)) {
              this.form.get(field)?.setErrors({ backend: error.error.errors[field] });
            }
          });
        }
        this.toastService.showErrorMessage(this.strings.sendEmail.error);
        this.cdr.markForCheck();
      }
    });
  }
}
