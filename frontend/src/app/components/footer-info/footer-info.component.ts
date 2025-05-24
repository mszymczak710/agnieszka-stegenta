import { Component } from '@angular/core';

import { strings } from '../../misc';

@Component({
  selector: 'as-footer-info',
  standalone: true,
  imports: [],
  templateUrl: './footer-info.component.html',
  styleUrl: './footer-info.component.scss'
})
export class FooterInfoComponent {
  strings = strings.footer;
  imageAlt = 'Agnieszka Stegenta';
  imageSrc = './assets/images/logo.png';
}
