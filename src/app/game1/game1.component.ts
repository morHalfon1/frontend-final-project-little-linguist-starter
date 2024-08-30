import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component,ViewChild, OnInit } from '@angular/core';
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
export class Game1Component implements OnInit {

  [x: string]: any;
  // private seenWords: Set<string> = new Set(); 
  private allWords: TranslatedWord[] = [];    
  selectCategory?: Category;
  currentWord?: TranslatedWord;  
  scrambledWord: string = '';    
  progress: number = 0;
  guess?: string = '';
  
  constructor(private categoriesService: CategoriesService,private router: Router) {}

  ngOnInit(): void {
    this.selectCategory = this.categoriesService.getSelectedCategory();
    console.log('Selected category in game:', this.selectCategory);
    if (this.selectCategory && this.selectCategory.words) {
      this.allWords = [...this.selectCategory.words];
      
    }
    this.loadWord();
  }
  @ViewChild(CoinsButtonComponent) coinButton!: CoinsButtonComponent;

  
  loadWord(): void {
    if(this.allWords.length===0){
      this['router'].navigate(['choose-game'])
      console.log("load word is working")
      return;
    }
    const selectedCategory = this.categoriesService.getSelectedCategory();
    if (selectedCategory && selectedCategory.words) {
     
      this['currentWord'] =  this.currentWord = this.getRandomWord();
      // this.getRandomWord(selectedCategory.words);
      if (this['currentWord']) {
        this['scrambledWord'] = this.scrambleWord(this['currentWord'].target);
      }
    }
  }

  getRandomWord(): TranslatedWord {
    const randomIndex = Math.floor(Math.random() * this.allWords.length);
    const selectedWord = this.allWords.splice(randomIndex, 1)[0];
    console.log(this.allWords);
    return selectedWord;
    
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
    console.log('Current Word:', this.currentWord);
    console.log('Guess:', this.currentWord?.guess);
    console.log('Target:', this.currentWord?.target);

    if (this['currentWord']?.guess && this['currentWord'].isMatch()) {
     // add into the component url instead
      this.onCorrectAnswer();
      alert('Correct!');
      this.resetGame();
    
    } else {
       // add into the component url instead
      alert('This isnt correct!');
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
    const coinsUpdate: number= Math.floor(100/ (this.allWords.length+1));
    this.coinButton.addPoints(coinsUpdate);  
    // this.updateProgress(10);  
  }

//   updateProgress(increment: number): void {
//     this.progress += increment;

//     // מוודא שמד ההתקדמות לא יעלה על 100%
//     if (this.progress > 100) {
//       this.progress = 100;
// }
//   }

//   updateProgress(increment: number): void {
//     this.progress += increment;
//     // מוודא שמד ההתקדמות לא יעלה על 100%
//     if (this.progress > 100) {
//       this.progress = 100;
// }
//   }
}

  