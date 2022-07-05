import { Component, OnInit, ViewChild } from '@angular/core';
import { StackedTimelineChartData } from '../model/stacked-timeline-chart-data.model';
import { DataService } from '../service/data.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexFill,
  ApexXAxis,
  ApexLegend,
  ApexTooltip,
} from "ng-apexcharts";
import { TimelineChartData } from '../model/timeline-chart-data.model';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  xaxis: ApexXAxis;
  legend: ApexLegend;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-timeline-chart',
  templateUrl: './timeline-chart.component.html',
  styleUrls: ['./timeline-chart.component.css']
})
export class TimelineChartComponent implements OnInit {

  entities: number[] = [1, 2, 3];
  data: Map<string, TimelineChartData[]> = new Map();

  @ViewChild("chart", { static: false })
  chart!: ChartComponent;

  public chartOptions: Partial<ChartOptions>;

  constructor(
    private dataService: DataService
  ) {
    this.chartOptions = {
      series: [],
      chart: {
        height: 350,
        type: "rangeBar"
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "50%",
          rangeBarGroupRows: true
        }
      },
      fill: {
        type: "solid"
      },
      xaxis: {
        type: "datetime"
      },
      legend: {
        position: "right"
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

          const seriesName = w.globals.initialSeries[seriesIndex].name;
          const enterDate = new Date(data.y[0]).toLocaleString('en-GB', { timeZone: 'UTC' });
          const exitDate = new Date(data.y[1]).toLocaleString('en-GB', { timeZone: 'UTC' });

          return '<div class="apexcharts-tooltip-rangebar"> <div> <span class="series-name" style="color: #FF4560">' +
            seriesName +
            '</span></div><div> <span class="category">Inky: </span> <span class="value start-value">' +
            enterDate +
            '</span> <span class="separator">-</span> <span class="value end-value">' +
            exitDate +
            '</span></div></div>';
        }
      }
    };
  }

  ngOnInit(): void {
    this.entities.forEach(id => {
      this.dataService.getTimelineData(id).subscribe(
        res => {

          res.map(r => {

            if (!this.data.has(r.name)) {
              this.data.set(r.name, r.data);

            } else if (this.data.has(r.name)) {
              this.data.set(r.name, this.data.get(r.name)!.concat(r.data));
            }
          });

          this.updateChart();
        });
    });
  }


  updateChart(): void {
    this.chartOptions.series = [];

    this.data.forEach((value, key) => {
      this.chartOptions.series!.push({
        name: key,
        data: value
      });
    });
  }
}
