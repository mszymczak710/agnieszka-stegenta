import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { strings } from '../../misc';

@Component({
  selector: 'app-consumer-reviews',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './consumer-reviews.component.html',
  styleUrl: './consumer-reviews.component.scss'
})
export class ConsumerReviewsComponent {
  reviews = [
    {
      opinion: 'Bardzo dziękuję, ZUS uchylił decyzję o zwrocie zasiłku chorobowego. Jestem ogromnie wdzięczna!',
      name: 'Magda',
      city: 'Bydgoszcz',
      imageSrc: './assets/images/user.png',
      imageAlt: 'Klientka'
    },
    {
      opinion:
        'Mimo odmowy ZUS, po odwołaniu do sądu przyznano mojej żonie świadczenie dla osób niezdolnych do samodzielnej egzystencji. Dziękujemy bardzo.',
      name: 'Andrzej',
      city: 'Konin',
      imageSrc: './assets/images/user.png',
      imageAlt: 'Klient'
    },
    {
      opinion:
        'Dzięki Pani Agnieszce przyznano mamie przez sąd całkowitą niezdolność do samodzielnej egzystencji a mnie świadczenie dla osób, które zrezygnowały z pracy aby opiekować się mamą.',
      name: 'Ewa',
      city: 'Bydgoszcz',
      imageSrc: './assets/images/user.png',
      imageAlt: 'Klientka'
    }
  ];

  stars: number[] = [1, 2, 3, 4, 5];
  strings = strings.consumerReviews;
}
