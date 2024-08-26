import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { ExitButtonComponent } from '../exit-button/exit-button.component';
import { CoinsButtonComponent } from '../coins-button/coins-button.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatedWord } from '../../shared/model/translated-word';

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
  ],
  templateUrl: './game1.component.html',
  styleUrl: './game1.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Game1Component {
  [x: string]: any;
  selectCategory?: Category;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    // debugger
    this.selectCategory = this.categoriesService.getSelectedCategory();
    console.log('Selected category in game:', this.selectCategory);
    this.loadWord();
  }
  @ViewChild(CoinsButtonComponent) coinButton!: CoinsButtonComponent;

  progress: number = 0;
  loadWord(): void {
    const selectedCategory = this.categoriesService.getSelectedCategory();
    if (selectedCategory && selectedCategory.words) {
      this['currentWord'] = this.getRandomWord(selectedCategory.words);
      if (this['currentWord']) {
        this['scrambledWord'] = this.scrambleWord(this['currentWord'].target);
      }
    }
  }

  getRandomWord(words: TranslatedWord[]): TranslatedWord {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  scrambleWord(word: string): string {
    return word
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');
  }

  onInput(): void {
    if (this['currentWord']) {
      this.progress =
        (this['currentWord'].guess.length / this['currentWord'].target.length) *
        100;
    }
  }

  submitGuess(): void {
    if (this['currentWord'] && this['currentWord'].isMatch()) {
      alert('Correct!');
      this.resetGame();
    } else {
      alert('Try again!');
    }
  }

  resetGame(): void {
    if (this['currentWord']) {
      this['currentWord'].guess = '';
      this.progress = 0;
      this.loadWord(); // Load new words for the next round
    }
  }
}
//   onCorrectAnswer(): void {
//     this.coinButton.addPoints(10); // מוסיף נקודות
//     this.updateProgress(10); // מעדכן את מד ההתקדמות
//   }

//   updateProgress(increment: number): void {
//     this.progress += increment;

//     // מוודא שמד ההתקדמות לא יעלה על 100%
//     if (this.progress > 100) {
//       this.progress = 100;
// }
//   }
// }
