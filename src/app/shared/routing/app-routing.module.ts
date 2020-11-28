import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../../components/verify-email/verify-email.component';

import { AuthGuard } from '../../shared/guard/auth.guard';
import {CategoryListComponent} from '../../components/dashboard/store/category-list/category-list.component';
import {ProfileComponent} from '../../components/dashboard/profile/profile.component';
import {ProductListComponent} from '../../components/dashboard/store/product-list/product-list.component';
import {IngredientsViewComponent} from '../../components/dashboard/store/ingredients-view/ingredients-view.component';
import {ProductsViewComponent} from '../../components/dashboard/store/products-view/products-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent},
  { path: 'register-user', component: SignUpComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full'},
      { path: 'profile', component: ProfileComponent },
      { path: 'ingredients', component: CategoryListComponent },
      { path: 'ingredients/:id', component: IngredientsViewComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', component: ProductsViewComponent },
    ] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
