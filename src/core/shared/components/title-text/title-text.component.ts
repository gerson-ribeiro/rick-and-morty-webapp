import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RickAndMortyApiService } from '../../../services/rick-and-morty-api.service';
import { FavoriteListService } from '../../../services/favorite-list.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-title-text',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './title-text.component.html',
  styleUrl: './title-text.component.scss',
})
export class TitleTextComponent {
  @Input('title') title: string = '';
  @Input('search_field') search_field: string | undefined;
  @Output('callApi') callApi: EventEmitter<any> = new EventEmitter();
  private _search: any = null;

  constructor(public _clientService: RickAndMortyApiService) {}

  public onSearchChange() {
    if (this.search_field && this._clientService && this.callApi) {
      clearTimeout(this._search);
      this._search = setTimeout(() => {
        this.callApi.emit(this.search_field ?? '');
      }, 600);
    }
  }
}
