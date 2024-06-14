import { Injectable, OnInit } from '@angular/core';
import IMetric from '../entities/metricsData';
import { METRICS_ACTIONS, METRICS_ITEM } from '../entities/constants';
import ICharacter from '../entities/characters';

@Injectable({
  providedIn: 'root',
})
export class MetricsService implements OnInit {
  private _storedMetrics: Array<IMetric<any>> = [];
  constructor() {}
  ngOnInit(): void {
    this._storedMetrics = JSON.parse(
      localStorage.getItem(METRICS_ITEM) || '[]'
    );
  }

  private _dispatchMetric(metric: IMetric<any>) {
    this._storedMetrics.push(metric);

    localStorage.setItem(METRICS_ITEM, JSON.stringify(this._storedMetrics));
  }

  public get storedMetrics() {
    return this._storedMetrics.length
      ? this._storedMetrics
      : JSON.parse(localStorage.getItem(METRICS_ITEM) || '[]');
  }

  public sendFilterEvent(filter: string) {
    this._dispatchMetric({
      action: METRICS_ACTIONS.FILTER_EVENT,
      metadata: {
        filter,
        date: new Date(),
      },
    });
  }

  public sendCardDetailClicked(char: ICharacter) {
    this._dispatchMetric({
      action: METRICS_ACTIONS.CARD_DETAIL_CLICKED,
      metadata: {
        char,
        date: new Date(),
      },
    });
  }
  public sendFavoritedClicked(char: ICharacter) {
    this._dispatchMetric({
      action: METRICS_ACTIONS.CARD_FAVORITED_CLICKED,
      metadata: {
        char,
        date: new Date(),
      },
    });
  }
}
