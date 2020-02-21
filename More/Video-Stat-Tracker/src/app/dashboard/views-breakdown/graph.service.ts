import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { startWith, map, filter } from 'rxjs/operators';

import { DashboardService } from '../dashboard.service';
import { GraphData, getGraphData } from './graph-helper';
import { Video } from '../dashboard.types';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  graphData: Observable<GraphData>;
  constructor(dashboardService: DashboardService) {
    this.graphData = combineLatest(
      dashboardService.currentVideo,
      dashboardService.filterForm.valueChanges.pipe(
        startWith(dashboardService.filterForm.value)
      )
    ).pipe(
      filter(([video]) => !!video),
      map(([video, formValue]) =>
        getGraphData(video as Video, formValue)
      )
    );
  }
}
