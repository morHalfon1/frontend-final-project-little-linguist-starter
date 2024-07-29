import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/gameProfile';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private game: GameProfile[] = [
    new GameProfile(1, 'first-game', 'matching words game', 'first-game'),
    new GameProfile(2, 'second-game', 'oposite words game', 'second-game'),
  ];

  constructor() {}
  list(): GameProfile[]{
    return this.game;
  }
}
