import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-coins-button',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './coins-button.component.html',
  styleUrl: './coins-button.component.css'
})


export class CoinsButtonComponent {
  points: number = 0;

  // will be updated when the user answer is true 
  addPoints(pointsToAdd: number): void {
    this.points += pointsToAdd;
  }
}




 



