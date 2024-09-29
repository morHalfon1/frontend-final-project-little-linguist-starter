import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GameProfile } from '../../shared/model/gameProfile';
import { Wordfinal } from '../final-screen/final-screen.component';
import { GameResult } from '../../shared/model/game-result.module';
import { addDoc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private wordResults: Wordfinal[] = [];
  private selectedCategoryId?: string;
  
  constructor(private firestore: Firestore) {}
  setSelectedCategoryId(categoryId: string): void {
    this.selectedCategoryId = categoryId; 
  }
  
  list(): Observable<GameResult[]> {
    const gamesCollection = collection(this.firestore, 'gameResults');
    console.log('Attempting to fetch game results...'); // הוספת הדפסה כאן
    return collectionData(gamesCollection, { idField: 'id' }) as Observable<GameResult[]>;
  }

  
  
  saveGameResult(categoryId: string, points: number): Promise<void> {
    const gameResultsCollection = collection(this.firestore, 'gameResults');
    const gameResultData = {
      categoryId: categoryId,
      gameId: 1,
      points: points,
      date: new Date(), // תאריך השמירה
    };
  
    return addDoc(gameResultsCollection, gameResultData) 
      .then(() => console.log('Game result saved successfully'))
      .catch((error) => {
        console.error("Error saving game result: ", error);
        throw error; // שגיאה תעבור הלאה
      });
  }

  // Fetch games from Firestore
  getGames(): Observable<GameProfile[]> {
    const gamesCollection = collection(this.firestore, 'games'); // Accessing the 'games' collection
    return collectionData(gamesCollection) as Observable<GameProfile[]>; // Type assertion to GameProfile[]
  }

  setResults(results: Wordfinal[]): void {
    this.wordResults = results;
  }

  getResults(): Wordfinal[] {
    return this.wordResults;
  }
}
