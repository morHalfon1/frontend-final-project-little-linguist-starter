import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, where } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { GameResult } from '../../shared/model/game-result.module';

@Injectable({
  providedIn: 'root'
})
export class GameResultService {
  private collectionName = 'gameResults';

  constructor(private firestore: Firestore, private auth: Auth) {}

  async addGameResult(gameResult: GameResult): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      const collectionConnection = collection(this.firestore, this.collectionName);
      await addDoc(collectionConnection, { ...gameResult, userId: user.uid });
    } else {
      throw new Error('User not authenticated');
    }
  }

  async list(): Promise<GameResult[]> {
    const user = this.auth.currentUser;
    if (user) {
      const collectionConnection = collection(this.firestore, this.collectionName);
      const q = query(collectionConnection, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const results: GameResult[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as GameResult;
        results.push(data);
      });
      return results;
    } else {
      throw new Error('User not authenticated');
    }
  }
}
export { GameResult };

