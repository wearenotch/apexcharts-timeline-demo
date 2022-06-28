import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StackedTimelineChartData } from "../models/stacked-timeline-chart-data.model";

@Injectable({ providedIn: 'root' })
export class DataService {

  resourceUrl = "/assets/data.json";

  constructor(
    private httpClient: HttpClient
  ) { }

  getTimelineData(): Observable<StackedTimelineChartData[]> {
    return this.httpClient.get<StackedTimelineChartData[]>(this.resourceUrl);
  }
}
