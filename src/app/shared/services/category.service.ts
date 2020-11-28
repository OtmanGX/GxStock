import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Category} from '../../models/category';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Product} from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  collectionName = 'ingredientsCat';
  productsCollectionName = 'ingredients';
  categories: Category[] = [];
  catSubject: Subject<Category[]> = new Subject<Category[]>();
  constructor(protected afs: AngularFirestore) {
    this.getCategories();
  }

  firestoreAutoId(): string {
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 20; i++) {
      autoId += CHARS.charAt(
        Math.floor(Math.random() * CHARS.length)
      );
    }
    return autoId;
  }

  addCategory(cat: Category) {
    const catRef: AngularFirestoreDocument<any> = this.afs.doc(`${this.collectionName}/${cat.id}`);
    catRef.set(cat, {merge: true});
  }



  getCategories() {
    const catCollection: AngularFirestoreCollection<Category> = this.afs.collection(this.collectionName);
    catCollection.valueChanges().pipe(tap((res) => {
      // console.log(res);
    })).subscribe(value => {
      this.categories = value;
      this.emitCategories();
    });
  }

  deleteCategorie(id) {
    return new Promise(((resolve, reject) => {
      this.afs.doc(`${this.collectionName}/${id}`).delete().then(value => () => {
        resolve();
      }, reason => reject(reason));
    }));
  }

  emitCategories() {
    this.catSubject.next(this.categories);
  }

  getProductsByCategory(cat: string): Observable<Product[]> {
    const catCollection: AngularFirestoreCollection<Product> = this.afs.collection(this.productsCollectionName,
        ref => ref.where('category', '==', cat));
    return catCollection.valueChanges();
  }

  addIngredient(prod: Product) {
    const catRef: AngularFirestoreDocument<any> = this.afs.doc(`${this.productsCollectionName}/${prod.id}`);
    catRef.set(prod, {merge: true});
  }

  deleteIngredient(id: string) {
    return this.afs.doc(`${this.productsCollectionName}/${id}`).delete();
  }
}
