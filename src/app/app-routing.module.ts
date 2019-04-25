import { CreatePostComponent } from './pages/create-post/create-post.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { IsLoginGuard } from './guards/is-login/is-login.guard';
import { StoreComponent } from './pages/store/store.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent, canActivate: [IsLoginGuard] },
  { path: '', component: HomeComponent, canActivate: [IsLoginGuard] },
  { path: 'home', component: HomeComponent, canActivate: [IsLoginGuard] },
  { path: 'store', component: StoreComponent, canActivate: [IsLoginGuard] },
  {
    path: 'my-products',
    component: MyProductsComponent,
    canActivate: [IsLoginGuard]
  },
  {
    path: 'create-post',
    component: CreatePostComponent,
    canActivate: [IsLoginGuard]
  },
  {
    path: 'home-admin',
    component: HomeAdminComponent,
    canActivate: [IsLoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
