import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { strings } from '../../misc';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  strings = strings.aboutMe;

  goToContactForm(): void {
    const element = document.querySelector('.contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}