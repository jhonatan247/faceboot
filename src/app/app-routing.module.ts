import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { IsLoginGuard } from './guards/is-login/is-login.guard';
import { StoreComponent } from './pages/store/store.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component: HomeComponent, canActivate: [IsLoginGuard] },
  { path: 'store', component: StoreComponent, canActivate: [IsLoginGuard] },
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
