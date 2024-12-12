import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactFormData } from '../types';
import { environment } from '../../environments/environment';

@Injectable()
export class ContactFormService {
  private apiUrl = environment.apiUrl + '/send-email/';

  constructor(private http: HttpClient) {}

  sendContactForm(data: ContactFormData): Observable<undefined> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<undefined>(this.apiUrl, data, { headers });
  }
}
