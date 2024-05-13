import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiContentService } from '../../../services/api-content.service';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css'
})
export class StaffComponent {
  //@Input() staff: string[] = [];

  constructor(private router: ActivatedRoute, private contentService: ApiContentService) { }

  hayStaff: boolean = false;
  staff: any[] = [];
  staff2: any[] = [];
  ngOnInit(): void {
    const id = this.router.parent?.snapshot.params[ 'id' ]
    if (id) {
      this.contentService.findStaff(id).then(res => {
        this.staff2 = res.data;
        
      });

      /*this.contentService.getCharacters(id).then(res => {
        this.staff = res.data.filter((item: any) => {
          return item.voice_actors.some((actor: any) => actor.language === 'English');
        });
      });*/

      //console.log(this.staff)

    }
  }

  //getInfo = () => this.staff2?.[0] ?  Object.entries(this.staff2?.[0]).filter(elm => ( elm[1] != 'null' && elm[1] != 'undefined' ) ) : []





}
