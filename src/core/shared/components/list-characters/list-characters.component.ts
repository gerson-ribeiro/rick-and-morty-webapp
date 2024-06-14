import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import ICharacter from '../../../entities/characters';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { CommonModule } from '@angular/common';
import { FavoriteListService } from '../../../services/favorite-list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-characters',
  standalone: true,
  templateUrl: './list-characters.component.html',
  styleUrl: './list-characters.component.scss',
  imports: [CommonModule, CharacterCardComponent],
})
export class ListCharactersComponent {
  @Input('characters')
  characters: Array<ICharacter> = [];
  @Input('showFav')
  showFav: boolean = true;
  @Input('favoriteds')
  public favoriteds: Array<ICharacter> = [];

  public isFavorited(char: ICharacter): boolean {
    const findPerson = this.favoriteds.find((fav) => fav.id == char.id);
    return findPerson !== undefined;
  }
}
