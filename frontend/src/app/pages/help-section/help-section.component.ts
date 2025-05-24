import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { strings } from '../../misc';

@Component({
  selector: 'as-help-section',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './help-section.component.html',
  styleUrl: './help-section.component.scss'
})
export class HelpSectionComponent {
  strings = strings.helpSection;
}
