export class GameResult {
  gameType?: string;
  isLearned: unknown;
  constructor(
    public categoryId: string,
    public gameId:number ,
    public date: Date,
    public points: number
  ) {}
}
