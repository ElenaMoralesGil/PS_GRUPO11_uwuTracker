import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-normal-row',
  standalone: true,
  imports: [],
  templateUrl: './normal-row.component.html',
  styleUrl: './normal-row.component.css'
})
export class NormalRowComponent {
  @Input() position1: string = "text";
  @Input() position2?: string = "text";
  @Input() position3?: string = "text";
  @Input() position4?: string = "text";
  @Input() position5?: string= "text";

}
