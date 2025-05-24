import { Component } from '@angular/core';

import { HeaderComponent, HelpSectionComponent, ProfileComponent, FooterComponent } from './pages';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { ConsumerReviewsComponent } from './pages/consumer-reviews/consumer-reviews.component';

@Component({
  selector: 'as-root',
  standalone: true,
  imports: [HeaderComponent, HelpSectionComponent, ProfileComponent, FooterComponent, ConsumerReviewsComponent, AboutMeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
