import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentPageComponent } from './pages/content-page/content-page.component';
import { ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ContentPageComponent]
})
export class AppComponent {
  title = 'client';

  

  
}
