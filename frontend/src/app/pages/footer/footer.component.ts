import { Component } from '@angular/core';

import { ContactFormComponent, FooterInfoComponent } from '../../components';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ContactFormComponent, FooterInfoComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {}
