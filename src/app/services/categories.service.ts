import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';
import { Language } from '../../shared/model/language';
import { TranslatedWord } from '../../shared/model/translated-word';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly CATEGORIES_KEY = 'categories';
  private readonly NEXT_ID_KEY = 'nextId';
  private selectCategory: Category | undefined;

  private categories: Category[] = [
    new Category(1, 'Colors', Language.English, Language.English),
    new Category(2, 'Animals', Language.English, Language.English),
    new Category(3, 'Food', Language.English, Language.English),
  ];

  constructor() {
    this.addTranslatedWordsColors();
    this.addTranslatedWordsAnimals();
    this.addTranslatedWordsFood();
  }

  addTranslatedWordsColors() {
    const words: TranslatedWord[] = [
      new TranslatedWord('אדום', 'RED'),
      new TranslatedWord('שחור', 'BLACK'),
      new TranslatedWord('כחול', 'BLUE'),
      new TranslatedWord('צהוב', 'YELLOW'),
    ];

    this.categories[0].words = words;
  }

  addTranslatedWordsAnimals() {
    const words: TranslatedWord[] = [
      new TranslatedWord('כלב', 'DOG'),
      new TranslatedWord('חתול', 'CAT'),
      new TranslatedWord('דג', 'FISH'),
      new TranslatedWord('סוס', 'HORSE'),
    ];

    this.categories[1].words = words;
  }

  addTranslatedWordsFood() {
    const words: TranslatedWord[] = [
      new TranslatedWord('ציפס', 'CHIPS'),
      new TranslatedWord('פיצה', 'PIZZA'),
      new TranslatedWord('לחם', 'BREAD'),
      new TranslatedWord('גבינה', 'CHEESE'),
    ];

    this.categories[2].words = words;
  }

  list(): Category[] {
    return this.categories;
  }

  setSelectedCategory(category: Category): void {
    this.selectCategory = category;
  }

  getSelectedCategory(): Category | undefined {
    return this.selectCategory;
  }

  private getCategories(): Map<number, Category> {
    const categoriesString = localStorage.getItem(this.CATEGORIES_KEY);
    return categoriesString
      ? new Map<number, Category>(JSON.parse(categoriesString))
      : new Map<number, Category>();
  }

  private getNextId(): number {
    const nextIdString = localStorage.getItem(this.NEXT_ID_KEY);
    return nextIdString ? parseInt(nextIdString) : 0;
  }

  private setCategories(list: Map<number, Category>): void {
    localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(Array.from(list)));
  }

  private setNextId(id: number): void {
    localStorage.setItem(this.NEXT_ID_KEY, id.toString());
  }

  get(id: number): Category | undefined {
    return this.getCategories().get(id);
  }

  delete(id: number): void {
    const categoriesMap = this.getCategories();
    categoriesMap.delete(id);
    this.setCategories(categoriesMap);
  }

  update(category: Category): void {
    const categoriesMap = this.getCategories();
    category.lastUpdateDate = new Date();
    categoriesMap.set(category.id, category);
    this.setCategories(categoriesMap);
  }

  add(category: Category): void {
    category.id = this.getNextId();
    category.lastUpdateDate = new Date();
    const categoriesMap = this.getCategories();
    categoriesMap.set(category.id, category);
    this.setCategories(categoriesMap);
    this.setNextId(++category.id);
  }
}
