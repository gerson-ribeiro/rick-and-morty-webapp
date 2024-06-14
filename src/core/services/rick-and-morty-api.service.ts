import { Injectable } from '@angular/core';
import ICharacter from '../entities/characters';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../entities/apiResponse';
import {
  Observable,
  ObservableInput,
  catchError,
  of,
  retry,
  throwError,
} from 'rxjs';
import IEpisode from '../entities/episodes';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyApiService {
  private _endpoint: { episode: string; character: string } = {
    episode: 'episode',
    character: 'character',
  };
  private _url: string = `https://rickandmortyapi.com/api/`;
  public characters: ICharacter[] = [];

  constructor(private _client: HttpClient) {}
  private _handleError({
    message,
    status,
  }: HttpErrorResponse): ObservableInput<ApiResponse> {
    if (status === 404)
      return of<ApiResponse>({
        info: { count: 0, pages: 0, next: '', prev: '' },
        results: [],
      });
    return throwError(
      () => new Error(`Unknown Error Happened: ${message + ' : ' + status}`)
    );
  }

  public get_characters(filters?: string): Observable<ApiResponse> {
    const path = filters
      ? this._url + this._endpoint.character + '?name=' + filters
      : this._url + this._endpoint.character;
    return this._client
      .get<ApiResponse>(path)
      .pipe(retry(3), catchError(this._handleError));
  }

  public find(id: number): Observable<ICharacter> {
    return this._client.get<ICharacter>(
      this._url + this._endpoint.character + '/' + id
    );
  }
  public find_episodes(ids: number[]) {
    return this._client.get<IEpisode[]>(
      this._url + this._endpoint.episode + '/' + ids.join(',')
    );
  }
}
