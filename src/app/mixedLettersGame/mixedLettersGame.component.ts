import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  OnInit,
} from '@angular/core';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { ExitButtonComponent } from '../exit-button/exit-button.component';
import { CoinsButtonComponent } from '../coins-button/coins-button.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { TranslatedWord } from '../../shared/model/translated-word';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CorrectDialogComponent } from '../correct-dialog/correct-dialog.component';
import { FailureDialogComponent } from '../failure-dialog/failure-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Wordfinal } from '../final-screen/final-screen.component';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-mixed-letters-game',
  standalone: true,
  imports: [
    CommonModule,
    ExitButtonComponent,
    CoinsButtonComponent,
    MatProgressBarModule,
    MatFormField,
    MatInputModule,
    FormsModule,
    MatInput,
    CorrectDialogComponent,
    FailureDialogComponent,
  ],
  templateUrl: './mixedLettersGame.component.html',
  styleUrls: ['./mixedLettersGame.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class mixedLettersGameComponent implements OnInit {
  [x: string]: unknown;
  private allWords: TranslatedWord[] = [];
  selectCategory?: Category;
  currentWord?: TranslatedWord;
  scrambledWord: string = '';
  progress: number = 0;
  guess?: string = '';
  totalWords: number = 0;
  completeWords: number = 0;
  dialogRef: unknown;
  wordResult: Wordfinal[] = [];

  onInput(): void {}

  constructor(
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
    private router: Router,
    private gamesService: GamesService
  ) {}

  ngOnInit(): void {
    this.selectCategory = this.categoriesService.getSelectedCategory();
    console.log('Selected category in game:', this.selectCategory);
    if (this.selectCategory && this.selectCategory.words) {
      this.allWords = this.selectCategory.words.map(
        (word) => new TranslatedWord(word.origin, word.target)
      );
      this.totalWords = this.allWords.length;
    }

    this.loadWord();
  }

  @ViewChild(CoinsButtonComponent) coinButton!: CoinsButtonComponent;

  loadWord(): void {
    if (this.allWords.length === 0) {
      this.finishGame();
      return;
    }

    this.currentWord = this.getRandomWord();
    console.log('Current Word:', this.currentWord);
    console.log(
      'Current Word Type:',
      this.currentWord instanceof TranslatedWord
    ); // Should be true

    if (this.currentWord) {
      this.scrambledWord = this.scrambleWord(this.currentWord.target);
    }
  }
  getRandomWord(): TranslatedWord {
    this.progress = 100 / this.totalWords;
    this.completeWords++;
    this.updateProgress();
    const randomIndex = Math.floor(Math.random() * this.allWords.length);
    return this.allWords.splice(randomIndex, 1)[0]; // Make sure this is a TranslatedWord
  }

  scrambleWord(word: string): string {
    return word
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');
  }

  isButtonDisabled(): boolean {
    if (!this.currentWord?.guess) {
      return true; // Disable if the guess is empty
    }

    // Regex to check if the text contains Hebrew characters
    const hebrewRegex = /[\u0590-\u05FF]/;
    if (hebrewRegex.test(this.currentWord.guess)) {
      return true; // Disable if the guess contains Hebrew characters
    }

    return false; // Enable otherwise
  }

  submitGuess(): void {
    let isCorrect = false;

    // Debugging logs
    console.log('Current Word:', this.currentWord);
    console.log(
      'Current Word Type:',
      this.currentWord instanceof TranslatedWord
        ? 'TranslatedWord'
        : 'Not TranslatedWord'
    );
    console.log('IsMatch function exists:', typeof this.currentWord?.isMatch);
    console.log('Guess:', this.currentWord?.guess);
    console.log('Target:', this.currentWord?.target);

    if (this.currentWord?.guess && this.currentWord.isMatch()) {
      this.dialogRef = this.dialog.open(CorrectDialogComponent);
      isCorrect = true;
      this.onCorrectAnswer();
    } else {
      this.dialogRef = this.dialog.open(FailureDialogComponent);
    }

    if (this.currentWord) {
      this.wordResult.push({
        hebrewWord: this.currentWord.origin,
        englishWord: this.currentWord.target,
        isCorrect: isCorrect,
      });
    }
    this.resetGame();
  }

  resetGame(): void {
    if (this.currentWord) {
      this.currentWord.guess = '';
      this.progress = 0;
      this.loadWord();
    }
  }

  onCorrectAnswer(): void {
    const coinsUpdate: number = Math.floor(100 / this.totalWords);
    this.coinButton.addPoints(coinsUpdate);
  }

  updateProgress(): void {
    this.progress = (this.completeWords / this.totalWords) * 100;
    console.log(this.progress);
  }

  finishGame(): void {
    this.gamesService.setResults(this.wordResult);
    this.router.navigate(['/final-screen']);
  }
}
