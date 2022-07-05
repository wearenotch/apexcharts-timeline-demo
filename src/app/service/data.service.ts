import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StackedTimelineChartData } from "../model/stacked-timeline-chart-data.model";

@Injectable({ providedIn: 'root' })
export class DataService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getTimelineData(id: number): Observable<StackedTimelineChartData[]> {
    return this.httpClient.get<StackedTimelineChartData[]>(`/assets/data_${id}.json`);
  }
}
