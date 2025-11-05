import { Routes } from '@angular/router';
import { LurchTrainer } from './pages/lurch-trainer/lurch-trainer';
import { PageNotFound } from './pages/page-not-found/page-not-found';

export const routes: Routes = [
	{ path: '', redirectTo: 'trainer', pathMatch: 'full' },
	{ path: 'trainer', component: LurchTrainer },
	{ path: '**', component: PageNotFound }
];
