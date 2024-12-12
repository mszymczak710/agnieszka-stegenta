import { Component } from '@angular/core';
import { HeaderComponent, HelpSectionComponent, ProfileComponent, FooterComponent } from './pages';
import { ConsumerReviewsComponent } from './pages/consumer-reviews/consumer-reviews.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, HelpSectionComponent, ProfileComponent, FooterComponent, ConsumerReviewsComponent, AboutMeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
