import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FavoriteListService } from '../../../services/favorite-list.service';
import { Observable, map } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIcon,
  ],
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  public path: string = '';
  public counter: Observable<number>;

  constructor(
    private _router: Router,
    public _favoriteList: FavoriteListService
  ) {
    this.counter = new Observable();
  }

  ngOnInit() {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.path = event.urlAfterRedirects;
      }
    });
    this.counter = this._favoriteList
      .getFavorites()
      .pipe(map((char) => char.length));
  }
}
