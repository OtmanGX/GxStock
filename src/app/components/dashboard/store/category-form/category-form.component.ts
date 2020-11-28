import {Component, ContentChild, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MDBModalRef} from 'angular-bootstrap-md';
import {IngredientService} from '../../../../shared/services/category.service';
import {Category} from '../../../../models/category';
import {ProductService} from '../../../../shared/services/product.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  validatingForm: FormGroup;
  serviceType: string;
  service: IngredientService;
  constructor(public modalRef: MDBModalRef,
              private ingredientService: IngredientService,
              private productService: ProductService,
              ) {
  }

  ngOnInit() {
    console.log(this.serviceType);
    if (this.serviceType === 'ingredients') {
      this.service = this.ingredientService;
    } else {
      this.service = this.productService;
    }
    this.validatingForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      description: new FormControl('', ),
    });
  }

  get nomForm() {
    return this.validatingForm.get('nom');
  }

  get descriptionForm() {
    return this.validatingForm.get('description');
  }

  submit() {
    const cat: Category = {id: this.service.firestoreAutoId(), nom: this.nomForm.value, description: this.descriptionForm.value};
    this.service.addCategory(cat);
    this.modalRef.hide();
  }
}
