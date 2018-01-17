import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graphic-dona',
  templateUrl: './graphic-dona.component.html',
  styles: []
})
export class GraphicDonaComponent implements OnInit {

  // Doughnut
  @Input() doughnutChartLabels: string[];
  @Input() doughnutChartData: number[];
  @Input() doughnutChartType: string;

  constructor() {
    this.doughnutChartLabels = [];
    this.doughnutChartData = [];
    this.doughnutChartType = '';
  }

  ngOnInit() {
  }

}
