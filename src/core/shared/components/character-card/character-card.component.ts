import { Component, Input, OnInit } from '@angular/core';
import ICharacter from '../../../entities/characters';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FavoriteListService } from '../../../services/favorite-list.service';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MetricsService } from '../../../services/metrics.service';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent implements OnInit {
  @Input('character')
  character!: ICharacter;
  @Input('showFav')
  showFav: boolean = false;
  @Input('isFavorited')
  isFavorited!: boolean;
  public iconName: string = 'favorite_border';

  constructor(
    private _favoriteList: FavoriteListService,
    private _router: Router,
    private _metricsService: MetricsService
  ) {}
  ngOnInit(): void {
    this.iconName = !this.isFavorited ? 'favorite_border' : 'favorite';
  }

  public handleFavorite() {
    this._metricsService.sendFavoritedClicked(this.character);
    if (!this.isFavorited) {
      this._favoriteList.setFavorites(this.character);
    } else {
      this._favoriteList.removeFavorite(this.character);
    }
    this.isFavorited = !this.isFavorited;
    this.iconName = !this.isFavorited ? 'favorite_border' : 'favorite';
  }

  public navigateToDetails() {
    this._metricsService.sendCardDetailClicked(this.character);
    this._router.navigate(['details', this.character.id]);
  }
}
