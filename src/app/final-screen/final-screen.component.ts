import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GamesService } from '../services/games.service';


export interface Wordfinal {
  hebrewWord: string;
  englishWord: string;
  isCorrect: boolean;
}

@Component({
  selector: 'app-final-screen',
  templateUrl: './final-screen.component.html',
  styleUrls: ['./final-screen.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class FinalScreenComponent implements OnInit {
  displayedColumns: string[] = ['hebrewWord', 'englishWord', 'isCorrect'];
  wordsFinal = new MatTableDataSource<Wordfinal>();

  constructor(private router: Router, private gamesService: GamesService) {}

  // ngOnInit(): void {
  //   const navigation = this.router.getCurrentNavigation();
  //   this.wordsFinal.data = this.gamesService.getResults(); 
  //   if (navigation?.extras.state) {
  //     const words = navigation.extras.state['wordsFinal'] as Wordfinal[];
  //     console.log('Received words in final-screen:', words);

  //     if (words && words.length > 0) {
  //       this.wordsFinal.data = words;
  //     } else {
  //       console.log('No words received or empty array in final-screen');
  //     }
  //   } else {
  //     console.log('No state received in final-screen');
  //   }
  // }
  
  ngOnInit(): void {
    const results = this.gamesService.getResults();
  console.log('Loaded results:', results);
  this.wordsFinal.data = results;

  }
  
  
}



