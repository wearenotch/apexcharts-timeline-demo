import { Component, OnInit, ViewChild } from '@angular/core';
import { StackedTimelineChartData } from '../model/stacked-timeline-chart-data.model';
import { DataService } from '../service/data.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexXAxis,
  ApexFill,
  ApexLegend,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  fill: ApexFill;
  legend: ApexLegend;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
  title: ApexTitleSubtitle;
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
      title: {
        text: "Timeline chart"
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
