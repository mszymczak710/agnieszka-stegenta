import { AbstractControl, ValidationErrors } from '@angular/forms';

import { phoneNumberValidator } from './phone-number';

export class CustomValidators {
  static phone(control: AbstractControl): ValidationErrors | null {
    return phoneNumberValidator(control);
  }
}
