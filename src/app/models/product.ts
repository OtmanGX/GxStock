import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface Product {
  id: string;
  nom: string;
  category: string;
  description: string;
  unit: string;
  qte: number;
  date: Timestamp;
}
