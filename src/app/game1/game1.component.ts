import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { ExitButtonComponent } from '../exit-button/exit-button.component';
import { CoinsButtonComponent } from '../coins-button/coins-button.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-game1',
  standalone: true,
  imports: [CommonModule,ExitButtonComponent , CoinsButtonComponent, MatProgressBarModule,MatFormField,MatInputModule],
  templateUrl: './game1.component.html',
  styleUrl: './game1.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Game1Component {
[x: string]: any;
  selectCategory?: Category;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.selectCategory = this.categoriesService.getSelectedCategory();
    console.log('Selected category in game:', this.selectCategory);
  }
  @ViewChild(CoinsButtonComponent) coinButton!: CoinsButtonComponent;

  progress: number = 0;

  onCorrectAnswer(): void {
    this.coinButton.addPoints(10); // מוסיף נקודות
    this.updateProgress(10); // מעדכן את מד ההתקדמות
  }

  updateProgress(increment: number): void {
    this.progress += increment;

    // מוודא שמד ההתקדמות לא יעלה על 100%
    if (this.progress > 100) {
      this.progress = 100;
}
  }
}
