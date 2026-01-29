import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import { BasicBarComponent } from "../basic-bar/basic-bar.component";
import { LineChartComponent } from "../line-chart/line-chart.component";
import { HeatMapComponent } from "../heatmap/heatmap.component";

@Component({
    selector: 'app-large-card',
    standalone: true,
    imports: [HeatMapComponent],
    templateUrl: './large-card.component.html',
    styleUrl: './large-card.component.css',
})
export class LargeCardComponent {
    @Input() chart: any = '';
    @Input() metric: any = '';
    @Input() status: any = '';
    @Input() location: any = '';

    WEEKLY_X = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    WEEKLY_Y = ['Floor 1', 'Floor 2', 'Floor 3'];
    WEEKLY_HEATMAP_DATA = [
        [0, 0, 45],
        [1, 0, 50],
        [2, 0, 55],
        [3, 0, 60],
        [4, 0, 70],
        [5, 0, 80],
        [6, 0, 65],
        [0, 1, 35],
        [1, 1, 40],
        [2, 1, 48],
        [3, 1, 52],
        [4, 1, 60],
        [5, 1, 68],
        [6, 1, 55],
        [0, 2, 25],
        [1, 2, 30],
        [2, 2, 35],
        [3, 2, 38],
        [4, 2, 45],
        [5, 2, 50],
        [6, 2, 42],
    ];
}

