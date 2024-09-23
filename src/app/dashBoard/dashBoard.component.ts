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
export class DashBoardComponent {
  playerData = {
    points: 98,
    gamesPlayed: 10,
    highestScoreGame: 'Mixed Letters',
    lowestScoreGame: 'Word Scramble',
    categoriesLearned: 50,
    categoriesNotLearned: 10,
    mostPlayedCategory: 'Animals',
    perfectGamesPercentage: 90,
    learnedCategoriesPercentage: 83,
    gamesThisMonth: 5,
    daysStrike: 3
  };
 }