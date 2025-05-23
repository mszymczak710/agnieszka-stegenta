import { AbstractControl, ValidationErrors } from '@angular/forms';

import { strings } from '../../misc';

export const phoneNumberValidator = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) {
    return null;
  }

  const phoneRegex = /^(\+?[1-9]\d{0,2}\s?)?(\d{3}\s?\d{3}\s?\d{3})$/;
  const valid = phoneRegex.test(control.value);

  return valid ? null : { phoneNumber: strings.contactForm.errors.phoneNumber };
};
