import { Component, OnInit } from '@angular/core';
import {CategoryListComponent} from '../category-list/category-list.component';
import {MDBModalService} from 'angular-bootstrap-md';
import {IngredientService} from '../../../../shared/services/category.service';
import {ProductService} from '../../../../shared/services/product.service';
import {Title} from '@angular/platform-browser';
import {CategoryFormComponent} from '../category-form/category-form.component';

@Component({
  selector: 'app-product-list',
  templateUrl: '../category-list/category-list.component.html',
  styleUrls: ['../category-list/category-list.component.css']
})
export class ProductListComponent extends CategoryListComponent implements OnInit {

  routeName = 'products';
  constructor(public modalService: MDBModalService,
              public ingredientService: IngredientService,
              public productService: ProductService,
              public title: Title
              ) {
    super(modalService, ingredientService, productService, title);
    this.title.setTitle('Produits');
    this.service = productService;
  }

  openModal() {
    this.modalRef = this.modalService.show(CategoryFormComponent, {data: {serviceType: 'products'}});
  }

  ngOnInit() {
    this.service.catSubject.asObservable().subscribe(value => this.categories$ = value);
    this.service.emitCategories();
  }


}
