import { Component } from '@angular/core';
import { ApiContentService } from '../../../services/api-content.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  constructor(private Contents: ApiContentService, private router: ActivatedRoute) { }
 
}
