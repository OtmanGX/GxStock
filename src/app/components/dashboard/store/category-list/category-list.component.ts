import {Component, ContentChild, OnInit, ViewChild} from '@angular/core';
import {CategoryFormComponent} from '../category-form/category-form.component';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {Observable} from 'rxjs';
import {Category} from '../../../../models/category';
import {IngredientService} from '../../../../shared/services/category.service';
import {ProductService} from '../../../../shared/services/product.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  modalRef: MDBModalRef;
  categories$: Category[];
  service: IngredientService;
  routeName = 'ingredients';

  constructor(protected modalService: MDBModalService,
              protected ingredientService: IngredientService,
              protected productService: ProductService,
              public title: Title
              ) {
    this.service = ingredientService;
    this.title.setTitle('Ingrédients');
  }

  ngOnInit(): void {
    // this.categories$ = this.service.catSubject.asObservable();
    this.service.catSubject.asObservable().subscribe(value => this.categories$ = value);
    this.service.emitCategories();
  }

  openModal() {
    this.modalRef = this.modalService.show(CategoryFormComponent, {data: {serviceType: 'ingredients'}});
  }

  openDeleteModal(id) {
      const result = window.confirm('Etes-vous sûre de vouloir supprimer la catégorie?');
      if (result) {
        this.service.deleteCategorie(id).then(() => console.log('deleted'), reason => console.log(reason));
      }
  }
}
