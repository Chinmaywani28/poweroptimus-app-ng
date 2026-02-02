import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import { BasicBarComponent } from "../basic-bar/basic-bar.component";
import { LineChartComponent } from "../line-chart/line-chart.component";
import { HeatMapComponent } from "../heatmap/heatmap.component";
import { CommonModule } from '@angular/common';
import { HeatMapTwoComponent } from "../heatmap-two/heatmap-two.component";

@Component({
    selector: 'app-large-card-two',
    standalone: true,
    imports: [HeatMapComponent, CommonModule, HeatMapTwoComponent],
    templateUrl: './large-card-two.component.html',
    styleUrl: './large-card-two.component.css',
})
export class LargeCardTwoComponent {
    selectedView: 'D' | 'W' | 'M' | 'Y' = 'D';

    WEEKLY_X: string[] = [];
    WEEKLY_Y: string[] = [];
    WEEKLY_HEATMAP_DATA: number[][] = [];
    dailyX: string[] = [];
    dailyY: string[] = [];
    dailyData: any = [];

    MONTHLY_X: any
    MONTHLY_Y: any
    MONTHLY_HEATMAP_DATA: any

    YEARLY_X: any
    YEARLY_Y: any
    YEARLY_HEATMAP_DATA: any

    ngOnInit() {
        this.loadDaily();
    }

    changeView(view: 'D' | 'W' | 'M' | 'Y') {
        this.selectedView = view;

        if (view === 'D') this.loadDaily();
        if (view === 'W') this.loadWeekly();
        if (view === 'M') this.loadMonthly();
        if (view === 'Y') this.loadYearly();

    }

    loadDaily() {
        this.dailyX = [
            '00',
            '01',
            '02',
            '03',
            '04',
            '05',
            '06',
            '07',
            '08',
            '09',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
        ];
        this.dailyY = ['Today'];
        this.dailyData = [
            [0, 0, 18],
            [1, 0, 17],
            [2, 0, 16],
            [3, 0, 16],
            [4, 0, 15],
            [5, 0, 15],
            [6, 0, 16],
            [7, 0, 18],
            [8, 0, 20],
            [9, 0, 22],
            [10, 0, 24],
            [11, 0, 25],
            [12, 0, 27],
            [13, 0, 28],
            [14, 0, 29],
            [15, 0, 30],
            [16, 0, 29],
            [17, 0, 28],
            [18, 0, 26],
            [19, 0, 24],
            [20, 0, 23],
            [21, 0, 22],
            [22, 0, 20],
            [23, 0, 19],
        ];
    }

    loadWeekly() {
        this.WEEKLY_X = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        this.WEEKLY_Y = ['Floor 1', 'Floor 2', 'Floor 3'];
        this.WEEKLY_HEATMAP_DATA = [
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

    loadMonthly() {
        this.MONTHLY_X  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        this.MONTHLY_Y = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
        this.MONTHLY_HEATMAP_DATA = [
            [0, 0, 30],
            [1, 0, 35],
            [2, 0, 40],
            [3, 0, 45],
            [4, 0, 50],
            [5, 0, 55],
            [6, 0, 60],
            [0, 1, 42],
            [1, 1, 48],
            [2, 1, 52],
            [3, 1, 58],
            [4, 1, 62],
            [5, 1, 68],
            [6, 1, 70],
            [0, 2, 50],
            [1, 2, 55],
            [2, 2, 60],
            [3, 2, 65],
            [4, 2, 70],
            [5, 2, 75],
            [6, 2, 80],
        ];
    }

    loadYearly(){
        this.YEARLY_X  = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec'
];

        this.YEARLY_Y = ['Floor 1', 'Floor 2', 'Floor 3'];
        this.YEARLY_HEATMAP_DATA = [
            [0, 0, 40],
            [1, 0, 45],
            [2, 0, 55],
            [3, 0, 65],
            [4, 0, 75],
            [5, 0, 85],
            [6, 0, 90],
            [7, 0, 88],

            [0, 1, 35],
            [1, 1, 40],
            [2, 1, 50],
            [3, 1, 60],
            [4, 1, 70],
            [5, 1, 78],
            [6, 1, 82],
            [7, 1, 80],

            [0, 2, 25],
            [1, 2, 30],
            [2, 2, 35],
            [3, 2, 45],
            [4, 2, 55],
            [5, 2, 65],
            [6, 2, 70],
            [7, 2, 68],
        ];

    }
    
}

