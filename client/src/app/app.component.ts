import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentPageComponent } from './pages/content-page/content-page.component';
import { ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';

  

  
}
