import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { GameProfile } from '../../shared/model/gameProfile';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChooseGameComponent } from '../chooseGame/chooseGame.component';
import { GameCardComponent } from '../game-card/game-card.component';
import { MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { TranslatedWord } from '../../shared/model/translated-word';

@Component({
  selector: 'app-game-dialog',
  standalone: true,
  imports: [
    MatSelectModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    ChooseGameComponent,
    GameCardComponent,
    MatDialogModule,
    MatButtonModule,
    MatDialogActions,
  ],
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.css'],
})
export class GameDialogComponent implements OnInit {
  categories: Category[] = [];
  selectCategory?: Category;
  words: TranslatedWord[] = []; // Local variable to hold the fetched words

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GameProfile,
    private categoriesService: CategoriesService,
    private router: Router,
    private dialogRef: MatDialogRef<GameDialogComponent>
  ) {}

  ngOnInit(): void {
    this.categoriesService.list().subscribe((categories: Category[]) => {
      this.categories = categories;
      console.log('Categories loaded:', this.categories);
    });
  }

  onCategoryChange(category: Category): void {
    this.selectCategory = category;
    console.log('Selected category:', category);

    // Fetch words for the selected category
    this.categoriesService
      .getWordsForCategory(category.id.toString())
      .subscribe((words: TranslatedWord[]) => {
        this.words = words;
        console.log('Words in selected category:', this.words);

        // Check if selectCategory is defined before assigning words
        if (this.selectCategory) {
          this.selectCategory.words = words; // Assign words to the selected category
        }
      });

    this.categoriesService.setSelectedCategory(this.selectCategory);
  }

  play(): void {
    console.log('Play button clicked');
    if (this.selectCategory) {
      console.log('Navigating to:', this.data.url);
      this.dialogRef.close();
      this.router.navigate([this.data.url]);
    } else {
      console.log('No category selected');
    }
  }
}
