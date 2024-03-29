import { Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { ReviewComponent } from "./components/review/review.component";
import { SignUpComponent } from "./components/header/sign-up/sign-up.component";
import { SignInComponent } from "./components/header/sign-in/sign-in.component";

import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/profile/profile.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ContentPageComponent } from './components/content-page/content-page.component';


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
    { path: 'auth/:id', component: SignUpComponent },
    { path: 'auth/sign-up', component: SignUpComponent },
    { path: 'auth/sign-in', component: SignInComponent },
    { path: 'review/:id', component: SignUpComponent },

    {
        'path': "", component: HomeComponent
    },
    { "path": 'profile', component: PerfilComponent },
    {
        'path': 'content-page/:id', component: ContentPageComponent,
    },
    {
        'path': 'content/:id/comments', component: CommentsComponent,
    }
]






