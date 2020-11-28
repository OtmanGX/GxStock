import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IngredientService} from '../../../../shared/services/category.service';
import {MDBModalRef} from 'angular-bootstrap-md';
import {ProductService} from '../../../../shared/services/product.service';
import {Category} from '../../../../models/category';
import {Product} from '../../../../models/product';
import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  validatingForm: FormGroup;
  title = 'produit';
  serviceType: string;
  prod: Product;
  category: string;
  service: IngredientService;
  constructor(public modalRef: MDBModalRef,
              private ingredientService: IngredientService,
              private productService: ProductService,
  ) {
  }

  ngOnInit() {
    console.log(this.serviceType);
    // console.log(this.prod);
    if (this.serviceType === 'ingredients') {
      this.title = 'ingrédient';
      this.service = this.ingredientService;
    } else {
      this.service = this.productService;
    }
    this.validatingForm = new FormGroup({
      nom: new FormControl(this.prod !== undefined ? this.prod.nom : '', Validators.required),
      description: new FormControl(this.prod !== undefined ? this.prod.description : '', ),
      qte: new FormControl(this.prod !== undefined ? this.prod.qte : 0, ),
      unit: new FormControl(this.prod !== undefined ? this.prod.unit : '', ),
    });
  }


  submit() {
    const prod: Product = {id: this.prod !== undefined ? this.prod.id : this.service.firestoreAutoId(),
      nom: this.validatingForm.get('nom').value,
      category: this.category,
      description: this.validatingForm.get('description').value,
      qte: this.validatingForm.get('qte').value,
      unit: this.validatingForm.get('unit').value,
      date: Timestamp.fromDate(new Date()),
    };
    this.service.addIngredient(prod);
    this.modalRef.hide();
  }
}
