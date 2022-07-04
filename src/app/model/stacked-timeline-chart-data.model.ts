import { TimelineChartData } from "./timeline-chart-data.model";

export class StackedTimelineChartData {
    public name: string;
    public data: TimelineChartData[];

    constructor(name: string, data: TimelineChartData[]) {
        this.name = name;
        this.data = data;
    }
}
