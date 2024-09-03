import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/gameProfile';
import { Wordfinal } from '../final-screen/final-screen.component';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private game: GameProfile[] = [
    new GameProfile(
      1,
      'משחק מילים מבולגנות',
      'עלייך לתרגם את המילים בעזרת המילים המבולגנות',
      'first-game'
    ),
    new GameProfile(
      2,
      'משחק מיון מילים',
      'עלייך למיין את המילים לפי הקטגוריה',
      'second-game'
    ),
  ];
  
  private wordResults: Wordfinal[] = [];

  constructor() {}
  list(): GameProfile[] {
    return this.game;
  }

  setResults(results: Wordfinal[]): void {
    this.wordResults = results;
  }

  getResults(): Wordfinal[] {
    return this.wordResults;
  }
}
