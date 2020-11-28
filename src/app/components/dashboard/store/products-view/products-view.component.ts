import { Component, OnInit } from '@angular/core';
import {IngredientService} from '../../../../shared/services/category.service';
import {Title} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {Product} from '../../../../models/product';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../../shared/services/product.service';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {CategoryFormComponent} from '../category-form/category-form.component';
import {ProductFormComponent} from '../product-form/product-form.component';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit {
  products$: Observable<Product[]>;
  modalRef: MDBModalRef;
  category: string;
  service: IngredientService;
  constructor(public ingredientService: IngredientService,
              public productService: ProductService,
              public title: Title,
              public activatedRoute: ActivatedRoute,
              protected modalService: MDBModalService,
              ) {
    this.category = this.activatedRoute.snapshot.params['id'];
    console.log(this.category);
  }

  ngOnInit(): void {
    this.service = this.productService;
    this.products$ = this.service.getProductsByCategory(this.category);
  }

  openModal(prod?: Product) {
    console.log(prod);
    this.modalRef = this.modalService.show(ProductFormComponent,
      {data: {serviceType: 'products', category: this.category, prod: prod}});
  }

  openDeleteModal(id) {
    const result = window.confirm('Etes-vous sûr de vouloir supprimer la catégorie?');
    if (result) {
      this.service.deleteIngredient(id).then();
    }
  }
}
