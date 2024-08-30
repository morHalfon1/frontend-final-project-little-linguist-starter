import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ChooseGameComponent } from '../chooseGame/chooseGame.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exit-dialog',
  standalone: true,
  imports: [MatDialogModule, ChooseGameComponent],
  templateUrl: './exit-dialog.component.html',
  styleUrl: './exit-dialog.component.css',
})
export class ExitDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ExitDialogComponent>,
    private router: Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
    this.router.navigate(['/choose-game']);
  }
}
