import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TitleTextComponent } from '../../../core/shared/components/title-text/title-text.component';
import { ListCharactersComponent } from '../../../core/shared/components/list-characters/list-characters.component';
import ICharacter from '../../../core/entities/characters';
import { RickAndMortyApiService } from '../../../core/services/rick-and-morty-api.service';
import { FavoriteListService } from '../../../core/services/favorite-list.service';
import { MetricsService } from '../../../core/services/metrics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    TitleTextComponent,
    ListCharactersComponent,
  ],
})
export class HomeComponent implements OnInit {
  public title: string = 'Início';
  public search: string = '';
  public characters: ICharacter[] = [];
  public favoriteds: ICharacter[] = [];
  public loading: boolean = false;

  constructor(
    public _clientService: RickAndMortyApiService,
    private _favoriteService: FavoriteListService,
    private _metricsService: MetricsService
  ) {}

  ngOnInit() {
    this.onSearch('');
  }
  public onSearch(event: string) {
    this.loading = true;
    if (event != '') {
      this._metricsService.sendFilterEvent(event);
    }

    this._clientService.get_characters(event).subscribe((apiResp) => {
      this.characters = apiResp.results;
      this._favoriteService.getFavorites().subscribe((char) => {
        this.favoriteds = char;
      });
      this.loading = false;
    });
  }
}
