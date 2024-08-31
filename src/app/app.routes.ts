import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { Game1Component } from './game1/game1.component';
import { Game2Component } from './game2/game2.component';
import { HelpComponent } from './help/help.component';
import { ChooseGameComponent } from './chooseGame/chooseGame.component';
import { ExitDialogComponent } from './exit-dialog/exit-dialog.component';
import { DashBoardComponent } from './dashBoard/dashBoard.component';

export const routes: Routes = [
  { path: '', component: DashBoardComponent },
  { path: 'categories', component: CategoriesListComponent },
  { path: 'category/:id', component: CategoryFormComponent },
  { path: 'newcategory', component: CategoryFormComponent },
  { path: 'choose-game', component: ChooseGameComponent },
  { path: 'first-game', component: Game1Component },
  { path: 'second-game', component: Game2Component },
  { path: 'help', component: HelpComponent },
{path: 'dashboard',component: DashBoardComponent},
  {path:'exit-dialog', component:ExitDialogComponent},
  { path: '**', redirectTo: '' },
];
