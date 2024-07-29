import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameProfile } from '../../shared/model/gameProfile';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChooseGameComponent } from "../chooseGame/chooseGame.component";
import { GameCardComponent } from "../game-card/game-card.component";
import { MatDialogActions } from '@angular/material/dialog';

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
    GameCardComponent
],
  templateUrl: './game-dialog.component.html',
  styleUrl: './game-dialog.component.css',
})
export class GameDialogComponent implements OnInit {
  categories: Category[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GameProfile,
    private categoriesService: CategoriesService
  ) {
    console.log(this.data);
  }
  ngOnInit(): void {
    this.categories = this.categoriesService.Categories;
  }


close(): void {
  this.dialogRef.close();
}

play(): void{
  
}
}
