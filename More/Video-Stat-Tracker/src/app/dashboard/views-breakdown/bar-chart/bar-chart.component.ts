import { Component, Input } from '@angular/core';

import { GraphData } from '../graph-helper';

@Component({
  selector: 'vst-bar-chart',
  templateUrl: './bar-chart.component.html'
})
export class BarChartComponent {
  @Input() graphData?: GraphData;
}
