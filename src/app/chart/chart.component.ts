import { Component, OnInit } from '@angular/core';
import { StackedTimelineChartData } from '../models/stacked-timeline-chart-data.model';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  data: StackedTimelineChartData[] = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.count().subscribe(
      res => {
        this.data = res;
      }
    );
  }

}
