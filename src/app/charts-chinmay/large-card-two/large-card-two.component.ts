import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import { BasicBarComponent } from "../basic-bar/basic-bar.component";
import { LineChartComponent } from "../line-chart/line-chart.component";
import { HeatMapComponent } from "../heatmap/heatmap.component";
import { CommonModule } from '@angular/common';
import { HeatMapTwoComponent } from "../heatmap-two/heatmap-two.component";
import { RefererComponent } from "../referer-of-website/heatmap-two.component";
import { HalftDoughnutComponent } from "../half-doughnut/half-doughnut.component";
import { CalendarPieComponent } from "../calendar-pie/calendar-pie.component";
import { SankeyComponent } from "../sankey/sankey.component";
import { RefererOfWebsitePieLargeCardComponent } from "../referer-of-website-pie-large-card/referer-of-website-pie-large-card.component";
import { PieWithPadAngleLargeCardComponent } from "../pie-with-padAngle-large-card/pie-with-padAngle-large-card.component";
import { FromLeftToRightTreeLargeCardComponent } from '../from-left-to-right-tree-large-card/from-left-to-right-tree-large-card.component';
import { GraphDynamicLargeCardComponent } from '../graph-dynamic-large-card/graph-dynamic-large-card-large-card.component';
import { ForceLayoutLargeCardComponent } from "../force-layout-large-card/force-layout-large-card.component";
import { CalenderHeatmapLargeCardComponent } from "../calender-heatmap-large-card/calender-heatmap-large-card.component";
import { DoughnutChartLargeCardComponent } from "../doughnut-chart-large-card/doughnut-chart-large-card.component";
import { BasicCandleStickLargeCardComponent } from "../basic-candlestick-large-card/basic-candlestick-large-card.component";
@Component({
    selector: 'app-large-card-two',
    standalone: true,
    imports: [HeatMapComponent, CommonModule, HeatMapTwoComponent, RefererComponent, HalftDoughnutComponent, CalendarPieComponent, SankeyComponent, RefererOfWebsitePieLargeCardComponent, PieWithPadAngleLargeCardComponent, FromLeftToRightTreeLargeCardComponent, GraphDynamicLargeCardComponent, ForceLayoutLargeCardComponent, CalenderHeatmapLargeCardComponent, DoughnutChartLargeCardComponent, BasicCandleStickLargeCardComponent],
    templateUrl: './large-card-two.component.html',
    styleUrl: './large-card-two.component.css',
})
export class LargeCardTwoComponent {
    selectedView: 'D' | 'W' | 'M' | 'Y' = 'W';
    @Input() chartName: any = 'heatmap';
    @Input() timeInterval: boolean = true;


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
    sankeyData: any
    sankeyLinks: any
    

    // sankeyData = [
    //     { name: 'Electricity Grid' },
    //     { name: 'Solar' },
    //     { name: 'L&T Building' },
    //     { name: 'Operation Building I' },
    //     { name: 'Operation Building II' },
    //     { name: 'Admin Buiding' },
    //     { name: 'HVAC System' },
    //     { name: 'Lighting System' },
    //     { name: 'Server Room' },
    //     { name: 'Security System' },
    //     { name: 'Cafeteria' }
    //   ];
    // sankeyLinks = [
        
    //     { source: 'Electricity Grid', target: 'L&T Building', value: 25 },
    //     { source: 'Solar', target: 'L&T Building', value: 10 },
    //     { source: 'L&T Building', target: 'Operation Building I', value: 13 },
    //     { source: 'L&T Building', target: 'Operation Building II', value: 8 },
    //     { source: 'L&T Building', target: 'Admin Buiding', value: 14 },

    //     // Third Level Connections
    //     { source: 'Operation Building I', target: 'HVAC System', value: 6 },
    //     { source: 'Operation Building I', target: 'Lighting System', value: 7 },

    //     { source: 'Operation Building II', target: 'Server Room', value: 5 },
    //     { source: 'Operation Building II', target: 'Security System', value: 3 },

    //     { source: 'Admin Buiding', target: 'Cafeteria', value: 14 }
      
    // ]



    ngOnInit() {
        this.loadDaily();
        this.loadWeekly()
    }

    changeView(view: 'D' | 'W' | 'M' | 'Y') {
        this.selectedView = view;

        if (view === 'D') this.loadDaily();
        if (view === 'W') this.loadWeekly();
        if (view === 'M') this.loadMonthly();
        if (view === 'Y') this.loadYearly();

    }

    loadDaily() {
        // this.dailyX = [
        //     '00',
        //     '01',
        //     '02',
        //     '03',
        //     '04',
        //     '05',
        //     '06',
        //     '07',
        //     '08',
        //     '09',
        //     '10',
        //     '11',
        //     '12',
        //     '13',
        //     '14',
        //     '15',
        //     '16',
        //     '17',
        //     '18',
        //     '19',
        //     '20',
        //     '21',
        //     '22',
        //     '23',
        // ];
        // this.dailyY = ['Today'];
        // this.dailyData = [
        //     [0, 0, 18],
        //     [1, 0, 17],
        //     [2, 0, 16],
        //     [3, 0, 16],
        //     [4, 0, 15],
        //     [5, 0, 15],
        //     [6, 0, 16],
        //     [7, 0, 18],
        //     [8, 0, 20],
        //     [9, 0, 22],
        //     [10, 0, 24],
        //     [11, 0, 25],
        //     [12, 0, 27],
        //     [13, 0, 28],
        //     [14, 0, 29],
        //     [15, 0, 30],
        //     [16, 0, 29],
        //     [17, 0, 28],
        //     [18, 0, 26],
        //     [19, 0, 24],
        //     [20, 0, 23],
        //     [21, 0, 22],
        //     [22, 0, 20],
        //     [23, 0, 19],
        // ];

        this.sankeyData = [
        { name: 'Electricity Grid' },
        { name: 'Solar' },
        { name: 'L&T Building' },
        { name: 'Operation Building I' },
        { name: 'Operation Building II' },
        { name: 'Admin Buiding' },
        { name: 'HVAC System' },
        { name: 'Lighting System' },
        { name: 'Server Room' },
        { name: 'Security System' },
        { name: 'Cafeteria' }
      ];

      this.sankeyLinks =  [
        { source: 'Electricity Grid', target: 'L&T Building', value: 25 },
        { source: 'Solar', target: 'L&T Building', value: 10 },
        { source: 'L&T Building', target: 'Operation Building I', value: 13 },
        { source: 'L&T Building', target: 'Operation Building II', value: 8 },
        { source: 'L&T Building', target: 'Admin Buiding', value: 14 },

        // Third Level Connections
        { source: 'Operation Building I', target: 'HVAC System', value: 6 },
        { source: 'Operation Building I', target: 'Lighting System', value: 7 },

        { source: 'Operation Building II', target: 'Server Room', value: 5 },
        { source: 'Operation Building II', target: 'Security System', value: 3 },

        { source: 'Admin Buiding', target: 'Cafeteria', value: 14 }
      
    ]
      
    }

    loadWeekly() {
        this.WEEKLY_X = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        this.WEEKLY_Y = ['Floor 1', 'Floor 2', 'Floor 3'];
        // this.WEEKLY_HEATMAP_DATA = [
        //     [0, 0, 25],
        //     [1, 0, 50],
        //     [2, 0, 55],
        //     [3, 0, 60],
        //     [4, 0, 70],
        //     [5, 0, 80],
        //     [6, 0, 65],
        //     [0, 1, 35],
        //     [1, 1, 40],
        //     [2, 1, 48],
        //     [3, 1, 52],
        //     [4, 1, 60],
        //     [5, 1, 68],
        //     [6, 1, 55],
        //     [0, 2, 25],
        //     [1, 2, 30],
        //     [2, 2, 35],
        //     [3, 2, 38],
        //     [4, 2, 45],
        //     [5, 2, 50],
        //     [6, 2, 42],
        // ];

        this.WEEKLY_HEATMAP_DATA = [
    // Row 1
    [0, 0, 46],
    [1, 0, 25],
    [2, 0, 27],
    [3, 0, 42],
    [4, 0, 50],
    [5, 0, 58],
    [6, 0, 65],

    // Row 2
    [0, 1, 65],
    [1, 1, 40],
    [2, 1, 25],
    [3, 1, 48],
    [4, 1, 40],
    [5, 1, 64],
    [6, 1, 40],

    // Row 3
    [0, 2, 30],
    [1, 2, 38],
    [2, 2, 78],
    [3, 2, 54],
    [4, 2, 62],
    [5, 2, 35],
    [6, 2, 78],
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

