import { Injectable } from '@angular/core';
import { AngularFireFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from '../../shared/model/category';
import { Language } from '../../shared/model/language';
import { TranslatedWord } from '../../shared/model/translated-word';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private selectCategory: Category | undefined;

  constructor(private firestore: AngularFireFirestore) {
    this.initializeCategories();
  }

  // Initialize categories in Firestore (you might want to run this only once)
  private async initializeCategories() {
    const existingCategories = await this.firestore
      .collection<Category>('categories')
      .get()
      .toPromise();
    if (existingCategories.empty) {
      await this.firestore
        .collection('categories')
        .add(new Category(1, 'Colors', Language.English, Language.English));
      await this.firestore
        .collection('categories')
        .add(new Category(2, 'Animals', Language.English, Language.English));
      await this.firestore
        .collection('categories')
        .add(new Category(3, 'Food', Language.English, Language.English));
      // Optionally call addTranslatedWords here if needed
    }
  }

  list(): Observable<Category[]> {
    return this.firestore.collection<Category>('categories').valueChanges();
  }

  setSelectedCategory(category: Category): void {
    this.selectCategory = category;
  }

  getSelectedCategory(): Category | undefined {
    return this.selectCategory;
  }

  async fetchTranslatedWords(categoryId: string): Promise<TranslatedWord[]> {
    const categoryRef = this.firestore.collection('categories').doc(categoryId);
    const categorySnapshot = await categoryRef.get().toPromise();
    if (categorySnapshot.exists) {
      const categoryData = categorySnapshot.data() as Category;
      return categoryData.words || []; // Return the words or an empty array if not present
    }
    return [];
  }

  get(id: string): Observable<Category | undefined> {
    return this.firestore
      .collection<Category>('categories')
      .doc(id)
      .valueChanges();
  }

  delete(id: string): Promise<void> {
    return this.firestore.collection('categories').doc(id).delete();
  }

  update(category: Category): Promise<void> {
    return this.firestore
      .collection('categories')
      .doc(category.id)
      .update(category);
  }

  add(category: Category): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore
      .collection('categories')
      .doc(id)
      .set({ ...category, id });
  }
}
