import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';
import { GameProfile } from '../../shared/model/gameProfile';
import { MatCard } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { GameCardComponent } from '../game-card/game-card.component';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-choose-game',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCard, GameCardComponent, RouterModule],
  templateUrl: './chooseGame.component.html',
  styleUrls: ['./chooseGame.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseGameComponent implements OnInit {
  games$!: Observable<GameProfile[]>; // Use observable for async data

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.games$ = this.gamesService.getGames(); // Fetch games from Firestore
  }
}
