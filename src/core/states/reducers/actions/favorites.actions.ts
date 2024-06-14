import { Action, createActionGroup, props } from '@ngrx/store';
import ICharacter from '../../../entities/characters';
import { FAVORITES_STORE } from '../../../entities/constants';
interface IAction extends Action {
  character: ICharacter;
}

export const favoritesActions = createActionGroup({
  source: FAVORITES_STORE,
  events: {
    add: props<{ character: ICharacter }>(),
    remove: props<{ character: ICharacter }>(),
    get: props<{ characters: ReadonlyArray<ICharacter> }>(),
  },
});

export const getFavorites = (_state: any, { characters }: any) => {
  return characters;
};

export const addFavorite = (state: any, { character }: IAction) =>
  state.indexOf(character) == -1 ? [...state, character] : state;

export const removeFavorite = (state: any, { character }: IAction) =>
  state.filter((x: { id: any }) => x.id !== character.id);
