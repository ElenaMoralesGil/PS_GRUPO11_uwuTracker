import { Component, Input, input } from '@angular/core';
import { ApiContentService } from '../../../services/api-content.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent {
  
  @Input() title: string[] = [];
  @Input() description: string[] = [];
  @Input() img: string[] = [];


    
}
