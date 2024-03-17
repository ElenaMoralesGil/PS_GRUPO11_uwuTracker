import { Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [

    {
        'path' : "", component:HomeComponent
    },

    {
        'path': 'content/:id', component: ContentComponent
    }

];
