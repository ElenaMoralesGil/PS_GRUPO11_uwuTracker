import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [AppComponent],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.css',
  
})
export class ContentPageComponent implements OnInit {

  ngOnInit() {
    
  }

}
