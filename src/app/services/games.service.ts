import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/gameProfile';

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

  constructor() {}
  list(): GameProfile[] {
    return this.game;
  }
}
