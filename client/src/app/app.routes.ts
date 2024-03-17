import { Routes } from '@angular/router';
import { PerfilComponent } from './components/profile/profile.component';
import { app } from '../../server';

export const routes: Routes = [
  // ... otras rutas
  { path: 'profile', component: PerfilComponent },

  app.get('/profilePlanToWatch', function(req, res) {
    res.sendFile(__dirname + '/client/src/app/components/profile/profilePlanToWatch.html');
});

  // ... otras rutas
];
