import { Component } from '@angular/core';

import { strings } from '../../misc';

@Component({
  selector: 'as-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  imageAlt = 'Agnieszka Stegenta';
  imageSrc = './assets/images/image.png';
  strings = strings.profile;
}
