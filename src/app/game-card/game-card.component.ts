import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameProfile } from '../../shared/model/gameProfile';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Game1Component } from '../game1/game1.component';
import { Game2Component } from '../game2/game2.component';
import { GameDialogComponent } from '../game-dialog/game-dialog.component';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDialogModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css',
})
export class GameCardComponent implements OnInit {
  dialog = inject(MatDialog);
  ngOnInit(): void {}
  @Input()
  currentGame!: GameProfile;

  openDialog() {
    this.dialog.open(GameDialogComponent, {
      height: '500px',
      width: '500px',
      data: this.currentGame,
    });
  }
}
