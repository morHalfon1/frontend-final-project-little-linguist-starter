export class GameResult {
  gameType?: string;
  isLearned: unknown;
  constructor(
    public categoryId: string,
    public gameId: string,
    public date: Date,
    public points: number
  ) {}
}
