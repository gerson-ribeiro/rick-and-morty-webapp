import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MetricsService } from '../../../core/services/metrics.service';
import { METRICS_ACTIONS } from '../../../core/entities/constants';
import IMetric from '../../../core/entities/metricsData';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  public loading = false;
  public view: [number, number] = [700, 500];
  public showXAxis: boolean = true;
  public showYAxis: boolean = true;
  public gradient: boolean = true;
  public showLegend: boolean = false;
  public showXAxisLabel: boolean = true;
  public xAxisLabel: string = 'Quantidade de Eventos';
  public showYAxisLabel: boolean = true;
  public yAxisLabel: string = 'Eventos';

  public results: any[] = [];
  public results_filtros: any[] = [];
  public results_cards: any[] = [];

  constructor(private _metricsService: MetricsService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this._init();
  }

  private _init() {
    const filterEvents = this._metricsService.storedMetrics.filter(
      ({ action }: any) => action === METRICS_ACTIONS.FILTER_EVENT
    );
    const cardAccessedEvents = this._metricsService.storedMetrics.filter(
      ({ action }: any) => action === METRICS_ACTIONS.CARD_DETAIL_CLICKED
    );
    const cardFavoritedEvents = this._metricsService.storedMetrics.filter(
      ({ action }: any) => action === METRICS_ACTIONS.CARD_FAVORITED_CLICKED
    );
    this.results = [
      ...filterEvents.map(({ action }: any) => ({
        name: 'Filtros Realizados',
        series: [{ name: 'Quantidade', value: filterEvents.length }],
      })),
      ...cardAccessedEvents.map(({ action }: any) => ({
        name: 'Cards Acessados',
        series: [{ name: 'Quantidade', value: cardAccessedEvents.length }],
      })),
      ...cardFavoritedEvents.map(({ action }: any) => ({
        name: 'Cards Favoritados',
        series: [{ name: 'Quantidade', value: cardFavoritedEvents.length }],
      })),
    ];
    this.results_filtros = filterEvents.map(({ metadata }: IMetric<any>) => ({
      name: metadata.filter,
      series: [
        {
          name: metadata.filter,
          value: filterEvents.filter(
            (event: any) => event.metadata.filter == metadata.filter
          ).length,
        },
      ],
    }));
    this.results_cards = cardAccessedEvents.map(
      ({ metadata }: IMetric<any>) => ({
        name: metadata.char.name,
        series: [
          {
            name: metadata.char.name,
            value: cardAccessedEvents.filter(
              (event: any) => event.metadata.char.name == metadata.char.name
            ).length,
          },
        ],
      })
    );
    this.loading = false;
  }
}
