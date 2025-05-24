import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ContactFormData } from '../types';

@Injectable()
export class ContactFormService {
  private apiUrl = environment.apiUrl + '/send-email/';

  constructor(private http: HttpClient) {}

  sendContactForm(data: ContactFormData): Observable<undefined> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // eslint-disable-line @typescript-eslint/naming-convention
    return this.http.post<undefined>(this.apiUrl, data, { headers });
  }
}
