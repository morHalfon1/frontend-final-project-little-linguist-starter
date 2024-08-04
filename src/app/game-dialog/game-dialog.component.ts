import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { GameProfile } from '../../shared/model/gameProfile';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChooseGameComponent } from '../chooseGame/chooseGame.component';
import { GameCardComponent } from '../game-card/game-card.component';
import { MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { categories } from '../../shared/data/categories';
import { routes } from '../app.routes';
import { Game1Component } from '../game1/game1.component';
import { Game2Component } from '../game2/game2.component';
import { Router } from '@angular/router';


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
    Game1Component,
    Game2Component,
  ],
  templateUrl: './game-dialog.component.html',
  styleUrl: './game-dialog.component.css',
})
export class GameDialogComponent implements OnInit {
  categories: Category[] = [];
  selectCategory?: Category;
  // router: any;
  selectedCategory: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GameProfile,
    private categoriesService: CategoriesService,
    private router: Router,
    private dialogRef: MatDialogRef<GameDialogComponent>,
    
  ) {
    console.log(this.data);
  }
  ngOnInit(): void {
    this.categories = this.categoriesService.list();
  }

  onCategoryChange(category: Category): void {
    this.selectCategory = category;
    console.log('Selected category:', category);
    this.categoriesService.setSelectedCategory(this.selectCategory);
  }

  play(): void {
    console.log(this.data.url);
    // if (this.selectCategory) {
    //   this.categoriesService.setSelectedCategory(this.selectCategory); 
    //   console.log(this.selectCategory);
      // Set the selected category in the shared service
    this.dialogRef.close();
    this.router.navigate([this.data.url]);
  }
}