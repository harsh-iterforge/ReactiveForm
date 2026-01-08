import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ReactiveFormsModule } from '@angular/forms';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { Home } from './home/home';
import { Header } from './header/header';

@NgModule({
  declarations: [
    App,
    Login,
    Signup,
    Home,
    Header,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,

  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
