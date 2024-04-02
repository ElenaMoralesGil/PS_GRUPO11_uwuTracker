import { Component } from '@angular/core';
import {EmergencyPopupComponent} from "../emergency-popup/emergency-popup.component";
import {NormalRowComponent} from "./normal-row/normal-row.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    EmergencyPopupComponent,
    NormalRowComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

}
