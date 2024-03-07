import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentPageComponent } from './pages/content-page/content-page.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: 'content', component: ContentPageComponent },

];

@NgModule({
    declarations: [
        
    ],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutesModule { }
