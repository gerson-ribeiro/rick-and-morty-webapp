import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FavoriteComponent } from './pages/favorites/favorite.component';
import { provideState } from '@ngrx/store';
import { FAVORITES_STORE } from '../core/entities/constants';
import { favoritesReducer } from '../core/states/reducers/favorites.reducer';
import { DetailsComponent } from './pages/details/details.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    providers: [
      provideState({ name: FAVORITES_STORE, reducer: favoritesReducer }),
    ],
    component: HomeComponent,
  },
  {
    path: 'favorite',
    providers: [
      provideState({ name: FAVORITES_STORE, reducer: favoritesReducer }),
    ],
    component: FavoriteComponent,
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
];
