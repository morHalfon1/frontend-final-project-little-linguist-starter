import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-failure-dialog',
  standalone: true,
  imports: [],
  templateUrl: './failure-dialog.component.html',
  styleUrl: './failure-dialog.component.css'
})
export class FailureDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FailureDialogComponent>
    
  ) {}

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}

