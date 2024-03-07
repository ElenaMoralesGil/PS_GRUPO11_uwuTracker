import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentPageComponent } from './pages/content-page/content-page.component';
import { ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';


@Component({
<<<<<<< HEAD
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ContentPageComponent]
=======
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
>>>>>>> dev
})
export class AppComponent {
  title = 'client';

  

  
}
