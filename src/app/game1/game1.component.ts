import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component,ViewChild } from '@angular/core';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { ExitButtonComponent } from '../exit-button/exit-button.component';
import { CoinsButtonComponent } from '../coins-button/coins-button.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { TranslatedWord } from '../../shared/model/translated-word';
import { FormsModule } from '@angular/forms';



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
  ],
  templateUrl: './game1.component.html',
  styleUrl: './game1.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Game1Component {
  // [x: string]: any;
  selectCategory?: Category;
  currentWord?: TranslatedWord;  
  scrambledWord: string = '';    
  progress: number = 0;
guess: any;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.selectCategory = this.categoriesService.getSelectedCategory();
    console.log('Selected category in game:', this.selectCategory);
    this.loadWord();
  }
  @ViewChild(CoinsButtonComponent) coinButton!: CoinsButtonComponent;

  
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
     // add into the component url instead
      alert('Correct!');
      this.resetGame();
      // add the moving to the other word in the category
    } else {
       // add into the component url instead
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
