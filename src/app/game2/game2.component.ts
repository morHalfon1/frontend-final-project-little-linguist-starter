
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-game2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game2.component.html',
  styleUrl: './game2.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Game2Component {
  selectCategory?: Category;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.selectCategory = this.categoriesService.getSelectedCategory();
    console.log('Selected category in game:', this.selectCategory);
  }
}

