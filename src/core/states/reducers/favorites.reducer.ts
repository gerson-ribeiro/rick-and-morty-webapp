import { createReducer, on } from '@ngrx/store';
import ICharacter from '../../entities/characters';
import {
  addFavorite,
  favoritesActions,
  getFavorites,
  removeFavorite,
} from './actions/favorites.actions';

const initialState: ReadonlyArray<ICharacter> = [];

export const favoritesReducer = createReducer(
  initialState,
  on(favoritesActions.add, addFavorite),
  on(favoritesActions.remove, removeFavorite),
  on(favoritesActions.get, getFavorites)
);
