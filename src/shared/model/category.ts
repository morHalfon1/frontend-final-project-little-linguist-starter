import { Language } from './language';
import { TranslatedWord } from './translated-word';

export class Category {
  lastUpdateDate = new Date();
  words: TranslatedWord[] = [];

  constructor(
    public id: string,
    public name: string,
    public origin: Language,
    public target: Language,
    words?: TranslatedWord[] // Optional parameter for words
  ) {
    if (words) {
      this.words = words; // Initialize words if provided
    }
  }
}
