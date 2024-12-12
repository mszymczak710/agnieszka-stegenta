import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactFormService } from './contact-form.service';
import { ContactFormData } from '../types';

@Injectable()
export class ContactFormFacade {
  constructor(private contactFormService: ContactFormService) {}

  sendContactForm(data: ContactFormData): Observable<undefined> {
    return this.contactFormService.sendContactForm(data);
  }
}
