import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TitleTextComponent } from '../../../core/shared/components/title-text/title-text.component';
import { ListCharactersComponent } from '../../../core/shared/components/list-characters/list-characters.component';
import ICharacter from '../../../core/entities/characters';
import { RickAndMortyApiService } from '../../../core/services/rick-and-morty-api.service';
import { FavoriteListService } from '../../../core/services/favorite-list.service';
import { MetricsService } from '../../../core/services/metrics.service';
import { ApiResponse } from '../../../core/entities/apiResponse';

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
  public next_loading: boolean = false;

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
    this.search = event;

    this._clientService.get_characters(event).subscribe((apiResp) => {
      this.characters = apiResp.results;
      this._favoriteService.getFavorites().subscribe((char) => {
        this.favoriteds = char;
      });
      this.loading = false;
    });
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos + 10 === max || pos === max) {
      this.next_loading = true;
      this._clientService.get_next(this.search).subscribe((apiResp) => {
        this.characters = [...this.characters, ...apiResp.results];
        this._favoriteService.getFavorites().subscribe((char) => {
          this.favoriteds = char;
        });
        this.next_loading = false;
      });
    }
  }
}
