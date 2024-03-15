import { Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import {ReviewComponent} from "./components/review/review.component";


export const routes: Routes = [
  {
    path: 'content/:id',
    component: ContentComponent,
    children: [
      { path: 'review/create', component: ReviewComponent }, // Child route for creating a review
      { path: 'review/:reviewId/edit', component: ReviewComponent },// Child route for editing a review
      { path: 'reviews', component: ReviewComponent } // Child route for viewing reviews
    ]
  }
];
