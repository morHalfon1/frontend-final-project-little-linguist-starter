import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-correct-dialog',
  standalone: true,
  imports: [],
  templateUrl: './correct-dialog.component.html',
  styleUrl: './correct-dialog.component.css'
})
export class CorrectDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CorrectDialogComponent>
    
  ) {}

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}

