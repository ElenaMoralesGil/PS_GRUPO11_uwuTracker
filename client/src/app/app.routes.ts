import { Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import {ReviewComponent} from "./components/review/review.component";


export const routes: Routes = [
    {
        'path': 'content/:id', component: ContentComponent,
        children: [
            { path: 'review/:id', component: ReviewComponent }
        ]
    }
];
