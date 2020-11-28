import { Component, OnInit } from '@angular/core';
import {ProductsViewComponent} from '../products-view/products-view.component';
import {IngredientService} from '../../../../shared/services/category.service';
import {ProductService} from '../../../../shared/services/product.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {MDBModalService} from 'angular-bootstrap-md';
import {ProductFormComponent} from '../product-form/product-form.component';
import {Product} from '../../../../models/product';

@Component({
  selector: 'app-ingredients-view',
  templateUrl: '../products-view/products-view.component.html',
  styleUrls: ['../products-view/products-view.component.css']
})
export class IngredientsViewComponent extends ProductsViewComponent implements OnInit {

  constructor(public ingredientService: IngredientService,
              public productService: ProductService,
              public title: Title,
              public activatedRoute: ActivatedRoute,
              public modalService: MDBModalService) {
    super(ingredientService, productService, title, activatedRoute, modalService);
  }

  ngOnInit(): void {
    this.service = this.ingredientService;
    this.products$ = this.service.getProductsByCategory(this.category);
  }

  openModal(prod?: Product) {
    console.log(prod);
    this.modalRef = this.modalService.show(ProductFormComponent,
      {data: {serviceType: 'ingredients', category: this.category, prod: prod}});
  }

}
