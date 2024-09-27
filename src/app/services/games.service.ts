import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GameProfile } from '../../shared/model/gameProfile';
import { Wordfinal } from '../final-screen/final-screen.component';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private wordResults: Wordfinal[] = [];

  constructor(private firestore: Firestore) {}

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
