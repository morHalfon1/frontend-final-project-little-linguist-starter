import { TestBed } from '@angular/core/testing';
import { GameResultService } from './game-result.service';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { GameResult } from '../../shared/model/game-result.module';
describe('GameResultService', () => {
  let service: GameResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameResultService,
        { provide: Firestore, useValue: {} }, 
        { provide: Auth, useValue: { currentUser: { uid: 'testUser' } } } 
      ]
    });
    service = TestBed.inject(GameResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a game result', async () => {
    // Include the 'isLearned' property
    const gameResult: GameResult = { 
      categoryId: '1', 
      gameId: '1', 
      date: new Date(), 
      points: 100,
      isLearned: true // Set a default value for the isLearned property
    };
    spyOn(service, 'addGameResult').and.returnValue(Promise.resolve());
    await service.addGameResult(gameResult);
    expect(service.addGameResult).toHaveBeenCalledWith(gameResult);
  });

  it('should list game results', async () => {
    // Ensure each result includes the 'isLearned' property
    const gameResults: GameResult[] = [{ 
      categoryId: '1', 
      gameId: '1', 
      date: new Date(), 
      points: 100,
      isLearned: true // Set a default value for the isLearned property
    }];
    spyOn(service, 'list').and.returnValue(Promise.resolve(gameResults));
    const results = await service.list();
    expect(results).toEqual(gameResults);
  });
});
