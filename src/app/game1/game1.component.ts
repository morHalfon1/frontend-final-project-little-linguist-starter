import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameDialogComponent } from '../game-dialog/game-dialog.component';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';


@Component({
  selector: 'app-game1',
  standalone: true,
  imports: [
    CommonModule,
    GameDialogComponent
  ],
  templateUrl: './game1.component.html',
  styleUrl: './game1.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Game1Component {
GameProfile: any;
selectCategory?: Category;
}

