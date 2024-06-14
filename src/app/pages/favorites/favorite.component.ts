import { Component, OnInit } from '@angular/core';
import { TitleTextComponent } from '../../../core/shared/components/title-text/title-text.component';
import { ListCharactersComponent } from '../../../core/shared/components/list-characters/list-characters.component';
import ICharacter from '../../../core/entities/characters';
import { FavoriteListService } from '../../../core/services/favorite-list.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorite',
  standalone: true,
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    TitleTextComponent,
    ListCharactersComponent,
  ],
})
export class FavoriteComponent implements OnInit {
  public title: string = 'Favoritos';
  public characters: ICharacter[] = [];

  constructor(private _favoriteList: FavoriteListService) {}

  ngOnInit(): void {
    this._favoriteList
      .getFavorites()
      .subscribe((char) => (this.characters = char));
  }
}
