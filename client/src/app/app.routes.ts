import { Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { CommentsComponent } from './components/comments/comments.component';



export const routes: Routes = [
    {
        'path': 'content/:id', component: ContentComponent,
    },
    {
        'path': 'content/:id/comments', component: CommentsComponent,
    }
];
