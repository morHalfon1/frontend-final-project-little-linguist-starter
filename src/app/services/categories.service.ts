// import { categories } from './../../shared/data/categories';
// import { Injectable } from '@angular/core';
// import { Category } from '../../shared/model/category';
// import { Language } from '../../shared/model/language';

// @Injectable({
//   providedIn: 'root',
// })
// export class CategoriesService {
//   [x: string]: any;
//   private readonly CATEGORIES_KEY = 'categories';
//   private readonly NEXT_ID_KEY = 'nextId';

//   private categories: Category[] = [
//     new Category(1, 'Colors', Language.English, Language.English),
//     new Category(2, 'animals', Language.English, Language.English),
//     new Category(3, 'food', Language.English, Language.English),
//   ];
//   open: any;

//     constructor() { }

//     list() : Category[] {
//       return this.categories;
//     }

//   private getCategories(): Map<number, Category> {
//     let categoriesString = localStorage.getItem(this.CATEGORIES_KEY);

//     if (!categoriesString) {
//       return new Map<number, Category>();
//     } else {
//       return new Map<number, Category>(JSON.parse(categoriesString));
//     }
//   }

//   private getNextId(): number {
//     let nextIdString = localStorage.getItem(this.NEXT_ID_KEY);

//     return nextIdString ? parseInt(nextIdString) : 0;
//   }

//   private setCategories(list: Map<number, Category>): void {
//     localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(Array.from(list)));
//   }

//   private setNextId(id: number): void {
//     localStorage.setItem(this.NEXT_ID_KEY, id.toString());
//   }

//   // list(): Category[] {
//   //   return Array.from(this.getCategories().values());
//   // }

//   get(id: number): Category | undefined {
//     return this.getCategories().get(id);
//   }

//   delete(id: number): void {
//     let categoriesMap = this.getCategories();
//     categoriesMap.delete(id);
//     this.setCategories(categoriesMap);
//   }

//   update(category: Category): void {
//     let categoriesMap = this.getCategories();

//     category.lastUpdateDate = new Date();
//     categoriesMap.set(category.id, category);

//     this.setCategories(categoriesMap);
//   }

//   add(category: Category): void {
//     category.id = this.getNextId();
//     category.lastUpdateDate = new Date();

//     let categoriesMap = this.getCategories();
//     categoriesMap.set(category.id, category);

//     this.setCategories(categoriesMap);
//     this.setNextId(++category.id);
//   }
// }

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

  addTranslatedWordsColors(){
    let words:TranslatedWord[] = [
           new TranslatedWord('אדום', "RED"),
           new TranslatedWord('שחור', "BLACK"),
           new TranslatedWord('כחול', "BLUE"),
           new TranslatedWord('צהוב', "YELLOW")
    ]

    this.categories[0].words = words;
  }

  addTranslatedWordsAnimals(){
    let words:TranslatedWord[] = [
           new TranslatedWord('כלב', "DOG"),
           new TranslatedWord('חתול', "CAT"),
           new TranslatedWord('דג', "FISH"),
           new TranslatedWord('סוס', "HORSE")
    ]

    this.categories[1].words = words;
  }

  addTranslatedWordsFood(){
    let words:TranslatedWord[] = [
           new TranslatedWord('ציפס', "CHIPS"),
           new TranslatedWord('פיצה', "PIZZA"),
           new TranslatedWord('לחם', "BREAD"),
           new TranslatedWord('גבינה', "CHEESE")
    ]

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
    let categoriesString = localStorage.getItem(this.CATEGORIES_KEY);
    return categoriesString
      ? new Map<number, Category>(JSON.parse(categoriesString))
      : new Map<number, Category>();
  }

  private getNextId(): number {
    let nextIdString = localStorage.getItem(this.NEXT_ID_KEY);
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
    let categoriesMap = this.getCategories();
    categoriesMap.delete(id);
    this.setCategories(categoriesMap);
  }

  update(category: Category): void {
    let categoriesMap = this.getCategories();
    category.lastUpdateDate = new Date();
    categoriesMap.set(category.id, category);
    this.setCategories(categoriesMap);
  }

  add(category: Category): void {
    category.id = this.getNextId();
    category.lastUpdateDate = new Date();
    let categoriesMap = this.getCategories();
    categoriesMap.set(category.id, category);
    this.setCategories(categoriesMap);
    this.setNextId(++category.id);
  }
}
