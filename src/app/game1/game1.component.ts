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

@Component({
  selector: 'app-game1',
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
  templateUrl: './game1.component.html',
  styleUrls: ['./game1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Game1Component implements OnInit {
  private allWords: TranslatedWord[] = [];
  selectCategory?: Category;
  currentWord?: TranslatedWord;
  scrambledWord: string = '';
  progress: number = 0;
  guess?: string = '';
  totalWords: number = 0;
  completeWords: number = 0;
  dialogRef: any;

  onInput(): void {
  }

  constructor(
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectCategory = this.categoriesService.getSelectedCategory();
    console.log('Selected category in game:', this.selectCategory);
    if (this.selectCategory && this.selectCategory.words) {
      this.allWords = [...this.selectCategory.words];
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

    const selectedCategory = this.categoriesService.getSelectedCategory();
    if (selectedCategory && selectedCategory.words) {
      this.currentWord = this.getRandomWord();
      if (this.currentWord) {
        this.scrambledWord = this.scrambleWord(this.currentWord.target);
      }
    }
  }

  getRandomWord(): TranslatedWord {
    this.progress = 100 / this.totalWords;
    this.completeWords++;
    this.updateProgress();
    const randomIndex = Math.floor(Math.random() * this.allWords.length);
    const selectedWord = this.allWords.splice(randomIndex, 1)[0];
    return selectedWord;
  }

  scrambleWord(word: string): string {
    return word
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');
  }

  submitGuess(): void {
    console.log('Current Word:', this.currentWord);
    console.log('Guess:', this.currentWord?.guess);
    console.log('Target:', this.currentWord?.target);

    if (this.currentWord?.guess && this.currentWord.isMatch()) {
      this.dialogRef = this.dialog.open(CorrectDialogComponent);
      this.onCorrectAnswer();
      this.resetGame();
    } else {
      this.dialogRef = this.dialog.open(FailureDialogComponent);
      this.resetGame();
    }
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
    console.log('Navigating to final-screen with words:', this.allWords);
    this.router.navigate(['/final-screen'], {
      state: { wordsFinal: this.allWords ?? [] }  
    });
  }
  
}
