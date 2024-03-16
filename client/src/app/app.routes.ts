import { Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import {ReviewComponent} from "./components/review/review.component";
import {SignUpComponent} from "./components/header/sign-up/sign-up.component";
import {SignInComponent} from "./components/header/sign-in/sign-in.component";


export const routes: Routes = [
  {
    path: 'content/:id',
    component: ContentComponent,
    children: [
      { path: 'review/create', component: ReviewComponent }, // Child route for creating a review
      { path: 'review/:reviewId/edit', component: ReviewComponent },// Child route for editing a review
      { path: 'review/:reviewId', component: ReviewComponent },// Child route for viewing individual review by ID
      { path: 'reviews', component: ReviewComponent } // Child route for viewing reviews
    ]
    },
  { path: 'auth', component: SignUpComponent,
  children : [
    { path: 'sign-up', component: SignUpComponent},
    { path: 'sign-in', component: SignInComponent}
  ]}

];
