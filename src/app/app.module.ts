import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// Reactive Form
import { ReactiveFormsModule } from '@angular/forms';

// App routing modules
import { AppRoutingModule } from './shared/routing/app-routing.module';

// App components
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Auth service
import { AuthService } from './shared/services/auth.service';
import { CategoryListComponent } from './components/dashboard/store/category-list/category-list.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { CategoryFormComponent } from './components/dashboard/store/category-form/category-form.component';
import { ProductListComponent } from './components/dashboard/store/product-list/product-list.component';
import { IngredientsViewComponent } from './components/dashboard/store/ingredients-view/ingredients-view.component';
import { ProductsViewComponent } from './components/dashboard/store/products-view/products-view.component';
import { ProductFormComponent } from './components/dashboard/store/product-form/product-form.component';
import { OperationsComponent } from './components/dashboard/store/operations/operations.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    CategoryListComponent,
    ProfileComponent,
    CategoryFormComponent,
    ProductListComponent,
    IngredientsViewComponent,
    ProductsViewComponent,
    ProductFormComponent,
    OperationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  entryComponents: [CategoryFormComponent],
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
