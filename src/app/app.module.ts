import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { IsLoginGuard } from './guards/is-login/is-login.guard';
import { UserService } from './services/user/user.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { StoreComponent } from './pages/store/store.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    HomeAdminComponent,
    StoreComponent,
    CreatePostComponent,
    MyProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'Faceboot'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule
  ],
  providers: [IsLoginGuard, UserService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
