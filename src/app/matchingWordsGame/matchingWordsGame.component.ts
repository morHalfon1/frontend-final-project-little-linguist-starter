import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-matching-word-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matchingWordsGame.component.html',
  styleUrl: './matchingWordsGame.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MatchingWordsGameComponent implements OnInit {
  selectCategory?: Category;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.selectCategory = this.categoriesService.getSelectedCategory();
    console.log('Selected category in game:', this.selectCategory);
  }
}
