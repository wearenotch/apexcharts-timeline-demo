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
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  xaxis: ApexXAxis;
  legend: ApexLegend;
};

@Component({
  selector: 'app-timeline-chart',
  templateUrl: './timeline-chart.component.html',
  styleUrls: ['./timeline-chart.component.css']
})
export class TimelineChartComponent implements OnInit {

  data: StackedTimelineChartData[] = [];

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
      }
    };
  }

  ngOnInit(): void {
    this.dataService.getTimelineData().subscribe(
      res => {
        this.data = res;
        this.chartOptions.series = this.data;
      }
    );
  }
}
