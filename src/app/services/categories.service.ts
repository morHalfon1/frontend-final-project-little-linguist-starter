import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
  setDoc,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Category } from '../../shared/model/category';
import { Language } from '../../shared/model/language'; // Import enum
import { TranslatedWord } from '../../shared/model/translated-word';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private selectedCategory?: Category; // Private field to store the selected category

  constructor(private firestore: Firestore) {}

  // Fetch categories from Firestore
  list(): Observable<Category[]> {
    const categoriesCollection = collection(this.firestore, 'categories');
    return collectionData(categoriesCollection, {
      idField: 'id',
    }) as Observable<Category[]>;
  }

  get(id: string): Observable<Category | undefined> {
    const categoryDoc = doc(this.firestore, `categories/${id}`);
    return from(getDoc(categoryDoc)).pipe(
      map((doc) => {
        if (doc.exists()) {
          const data = doc.data() as any;

          // Ensure words are fetched properly
          const words = data.words
            ? data.words.map(
                (wordData: any) =>
                  new TranslatedWord(wordData.origin, wordData.target)
              )
            : [];

          const origin =
            data.origin === Language.Hebrew
              ? Language.Hebrew
              : Language.English;
          const target =
            data.target === Language.Hebrew
              ? Language.Hebrew
              : Language.English;

          // Pass the words array to the Category constructor
          return new Category(
            +data.id,
            data.name,
            origin,
            target,
            words // Ensure words are included here
          );
        }
        return undefined;
      })
    );
  }

  // Update a category in Firestore
  update(category: Category): Promise<void> {
    const categoryDoc = doc(this.firestore, `categories/${category.id}`);
    return updateDoc(categoryDoc, { ...category });
  }

  // Add a new category to Firestore
  add(category: Category): Promise<void> {
    const categoryDoc = doc(this.firestore, `categories/${category.id}`);
    return setDoc(categoryDoc, { ...category });
  }

  // Delete a category from Firestore
  delete(id: string): Promise<void> {
    const categoryDoc = doc(this.firestore, `categories/${id}`);
    return deleteDoc(categoryDoc);
  }

  // Set the selected category
  setSelectedCategory(category: Category): void {
    this.selectedCategory = category;
  }

  // Add this method to fetch words for a specific category
  getWordsForCategory(categoryId: string): Observable<TranslatedWord[]> {
    const wordsCollection = collection(
      this.firestore,
      `categories/${categoryId}/words`
    );
    return collectionData(wordsCollection) as Observable<TranslatedWord[]>;
  }
  // Get the selected category
  getSelectedCategory(): Category | undefined {
    return this.selectedCategory;
  }
}
