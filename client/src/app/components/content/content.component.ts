import { Component, OnInit } from '@angular/core';
import { ApiContentService } from '../../services/api-content.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {

  protected id?: string
  protected title?: string

  constructor(private Contents: ApiContentService, private router: ActivatedRoute) { }

  async ngOnInit() {
    let content
    try { content = await this.Contents.findById(this.router.snapshot.paramMap.get("id") || "") }
    catch { return this.id = 'not-found' }

    if (!content?.id) return this.id = 'not found'

    this.id = content.id
    this.title = content.title

    return
  }
}
