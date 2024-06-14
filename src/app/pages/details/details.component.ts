import { Component, OnInit } from '@angular/core';
import ICharacter from '../../../core/entities/characters';
import { RickAndMortyApiService } from '../../../core/services/rick-and-morty-api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import IEpisode from '../../../core/entities/episodes';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  public id: number;
  public character?: ICharacter;
  public loading: boolean;
  public loading_episodes: boolean;
  public episodes: IEpisode[] = [];
  public episode_ids: number[] = [];
  constructor(
    private _clientApi: RickAndMortyApiService,
    private _activeRoute: ActivatedRoute
  ) {
    this.id = 0;
    this.loading = true;
    this.loading_episodes = false;
  }

  ngOnInit(): void {
    this._init();
  }

  private _init() {
    this._activeRoute.params.subscribe((route) => {
      this.id = route['id'];
      this._find();
    });
  }
  private _find() {
    this._clientApi.find(this.id).subscribe((char) => {
      this.character = char;
      this.episode_ids = char.episode.map((x) =>
        parseInt(x.replace('https://rickandmortyapi.com/api/episode/', ''))
      );
      this.loading = false;
    });
  }
  public onEpisodesClick() {
    this.loading_episodes = true;
    console.log('clicked');

    this._clientApi.find_episodes(this.episode_ids).subscribe((epi) => {
      if (Array.isArray(epi)) {
        this.episodes = epi;
      } else {
        this.episodes = [epi];
      }
      this.loading_episodes = false;
    });
  }
}
