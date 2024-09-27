import { Component, OnInit } from '@angular/core';
import { GameResultService } from '../services/game-result.service';
import { GameResult} from '../services/game-result.service';

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

  constructor(private gameResultService: GameResultService) {}

  async ngOnInit() {
    try {
      this.gameResults = await this.gameResultService.list();
      console.log(this.gameResults);  

      this.totalGames = this.gameResults.length;
      this.totalPoints = this.gameResults.reduce((sum, result) => sum + result.points, 0);


      const sortedGames = [...this.gameResults].sort((a, b) => b.points - a.points);
      this.highestScoreGameType = sortedGames[0]?.gameType || '';
      this.lowestScoreGameType = sortedGames[sortedGames.length - 1]?.gameType || '';


      this.learnedCategoriesCount = this.gameResults.filter(result => result.isLearned).length;
      this.notLearnedCategoriesCount = this.gameResults.length - this.learnedCategoriesCount;


      this.perfectGamesPercentage = (this.gameResults.filter(result => result.points === 100).length / this.totalGames) * 100;


      const categoryMap = new Map<string, number>();
      this.gameResults.forEach(result => {
        categoryMap.set(result.categoryId, (categoryMap.get(result.categoryId) || 0) + 1);
      });
      this.mostPlayedCategory = Array.from(categoryMap.entries()).reduce((max, entry) => entry[1] > max[1] ? entry : max)[0];


      this.learnedCategoriesPercentage = (this.learnedCategoriesCount / this.gameResults.length) * 100;

    } catch (error) {
      console.error('Error fetching game results:', error);
    }
  }
}