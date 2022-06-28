import { Component, OnInit, ViewChild } from '@angular/core';
import { StackedTimelineChartData } from '../models/stacked-timeline-chart-data.model';
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
import { TimelineChartData } from '../models/timeline-chart-data.model';

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

        const map: Map<string, TimelineChartData[]> = new Map();

        this.data.map(d => {
          if (!map.has(d.name)) {
            map.set(d.name, d.data);
          } else if (map.has(d.name)) {
            map.set(d.name, map.get(d.name)!.concat(d.data));
          }
        });

        this.updateChart(map);
      }
    );
  }

  updateChart(map: Map<string, TimelineChartData[]>): void {
    this.chartOptions.series = [];

    map.forEach((value, key) => {
      this.chartOptions.series!.push({
        name: key,
        data: value
      });
    });
  }

}
