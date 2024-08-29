import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ChooseGameComponent } from '../chooseGame/chooseGame.component';


@Component({
  selector: 'app-exit-button',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,CommonModule,RouterModule,RouterLink,ChooseGameComponent],
  templateUrl: './exit-button.component.html',
  styleUrl: './exit-button.component.css'
})

export class ExitButtonComponent {
  constructor(private router: Router) {}
  exitGame(): void {
    console.log("button works");
     this.router.navigate(['/choose-game']);
  }
}

