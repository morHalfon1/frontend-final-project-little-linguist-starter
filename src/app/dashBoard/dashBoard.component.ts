import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dashBoard.component.html',
  styleUrl: './dashBoard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashBoardComponent { }
