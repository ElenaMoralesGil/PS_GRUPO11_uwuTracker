import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentPageComponent } from './pages/content-page/content-page.component';
import { RouterModule } from '@angular/router';
import { AppRoutesModule } from './app.routes';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    AppRoutesModule
    
  ],
  providers: [],
})
export class AppModule { }

