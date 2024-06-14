import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import ICharacter from '../entities/characters';
import { Observable, map } from 'rxjs';
import { favoritesActions } from '../states/reducers/actions/favorites.actions';
import { selectFavorites } from '../states/selectors/favorites.selectors';

@Injectable({
  providedIn: 'root',
})
export class FavoriteListService {
  constructor(private _store: Store) {}

  public getFavorites(): Observable<ICharacter[]> {
    return this._store.select(selectFavorites);
  }
  public setFavorites(chars: ICharacter[] | ICharacter) {
    if (Array.isArray(chars)) {
      chars.map((char) =>
        this._store.dispatch(favoritesActions.add({ character: char }))
      );
    } else {
      this._store.dispatch(favoritesActions.add({ character: chars }));
    }
  }
  public removeFavorite(char: ICharacter) {
    this._store.dispatch(favoritesActions.remove({ character: char }));
  }
}
