import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ContactFormData } from '../types';
import { ContactFormService } from './contact-form.service';

@Injectable()
export class ContactFormFacade {
  constructor(private contactFormService: ContactFormService) {}

  sendContactForm(data: ContactFormData): Observable<undefined> {
    return this.contactFormService.sendContactForm(data);
  }
}
