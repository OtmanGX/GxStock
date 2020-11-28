import { Injectable } from '@angular/core';
import {IngredientService} from './category.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends IngredientService {
  collectionName = 'productsCat';
  productsCollectionName = 'products';
  constructor(public afs: AngularFirestore) {
    super(afs);
    this.getCategories();
  }
}
