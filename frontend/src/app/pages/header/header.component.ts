import { Component } from '@angular/core';

import { strings } from '../../misc';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  imageAlt = 'Agnieszka Stegenta';
  imageSrc = './assets/images/logo.png';
  strings = strings.header;
}
