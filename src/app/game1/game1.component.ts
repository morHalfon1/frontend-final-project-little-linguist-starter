import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-game1',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './game1.component.html',
  styleUrl: './game1.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Game1Component { }
