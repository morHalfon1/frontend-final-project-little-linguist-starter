import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameProfile } from '../../shared/model/gameProfile';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GameDialogComponent } from '../game-dialog/game-dialog.component';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDialogModule],
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'], // Fixed styleUrl to styleUrls
})
export class GameCardComponent {
  dialog = inject(MatDialog);

  @Input()
  currentGame!: GameProfile; // Ensure this matches the expected input

  openDialog() {
    this.dialog.open(GameDialogComponent, {
      height: '500px',
      width: '500px',
      data: this.currentGame, // This sends the current game data to the dialog
    });
  }
}
