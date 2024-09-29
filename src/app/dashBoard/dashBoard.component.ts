import { Component, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';
import { GameResult } from '../../shared/model/game-result.module';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dashBoard.component.html',
  styleUrls: ['./dashBoard.component.css']
})
export class DashboardComponent implements OnInit {
  gameResults: GameResult[] = [];
  totalPoints: number = 0;
  totalGames: number = 0;
  highestScoreGameType: string = '';
  lowestScoreGameType: string = '';
  learnedCategoriesCount: number = 0;
  notLearnedCategoriesCount: number = 0;
  perfectGamesPercentage: number = 0;
  mostPlayedCategory: string = '';
  learnedCategoriesPercentage: number = 0;

  constructor(private gameResultService: GamesService) {
    console.log('DashboardComponent initialized'); 
    console.log('Game results in dashboard:', this.gameResults);  
  }

  ngOnInit() {
    console.log('Some method called');

    // הרשמה ל-Observable מהשירות
    this.gameResultService.list().subscribe(
        results => {
            this.gameResults = results;
            console.log('Game results in dashboard:', this.gameResults);

            this.totalGames = this.gameResults.length;
            this.totalPoints = this.gameResults.reduce((sum, result) => sum + result.points, 0);

            const sortedGames = [...this.gameResults].sort((a, b) => b.points - a.points);
            this.highestScoreGameType = sortedGames[0]?.gameType || '';
            this.lowestScoreGameType = sortedGames[sortedGames.length - 1]?.gameType || '';

            this.learnedCategoriesCount = this.gameResults.filter(result => result.isLearned).length;
            this.notLearnedCategoriesCount = this.gameResults.length - this.learnedCategoriesCount;

            this.perfectGamesPercentage = this.totalGames > 0 ? (this.gameResults.filter(result => result.points === 100).length / this.totalGames) * 100 : 0;

            const categoryMap = new Map<string, number>();
            this.gameResults.forEach(result => {
                categoryMap.set(result.categoryId, (categoryMap.get(result.categoryId) || 0) + 1);
            });
            this.mostPlayedCategory = Array.from(categoryMap.entries()).reduce((max, entry) => entry[1] > max[1] ? entry : max)[0];

            this.learnedCategoriesPercentage = this.totalGames > 0 ? (this.learnedCategoriesCount / this.totalGames) * 100 : 0;

        },
        error => {
            console.error('Error fetching game results:', error);
        }
    );
}
}