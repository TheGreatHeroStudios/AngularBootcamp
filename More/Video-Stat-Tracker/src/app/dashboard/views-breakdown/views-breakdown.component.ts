import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { GraphData } from './graph-helper';
import { GraphService } from './graph.service';

@Component({
  selector: 'vst-views-breakdown',
  templateUrl: './views-breakdown.component.html'
})
export class ViewsBreakdownComponent {
  graphData: Observable<GraphData>;

  constructor(graphService: GraphService) {
    this.graphData = graphService.graphData;
  }
}
