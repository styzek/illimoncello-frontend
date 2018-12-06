import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TokenStorage } from './user/token.storage';
import { AuthService } from 'src/app/services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { PizzaModule } from './pizza/pizza.module';
import { UserModule } from './user/user.module';
import { OtherModule } from './other/other.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Interceptor } from './interceptors/my-jwt-interceptor';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponentComponent,
    HeaderComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PizzaModule,
    UserModule,
    OtherModule,
    HttpClientModule,
    FormsModule,
    HttpModule
  ],
  providers: [AuthService, TokenStorage,

    {provide: HTTP_INTERCEPTORS,

    useClass: Interceptor,

    multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
