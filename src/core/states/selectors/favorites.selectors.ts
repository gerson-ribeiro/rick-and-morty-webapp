import { createFeatureSelector, createSelector } from '@ngrx/store';
import ICharacter from '../../entities/characters';
import { FAVORITES_STORE } from '../../entities/constants';

export const selectFavorites =
  createFeatureSelector<Array<ICharacter>>(FAVORITES_STORE);

export const selectFavoritesCollection = createSelector(
  selectFavorites,
  (characters) => characters
);
