import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import { BasicBarComponent } from "../basic-bar/basic-bar.component";
import { LineChartComponent } from "../line-chart/line-chart.component";
import { BasicLineChartComponent } from "../basic-line-chart/line-chart.component";
import { SankeyChartComponent } from "../sankey-chart/sankey-chart.component";
import { StageSpeedGuageComponent } from "../stage-speed-guage/stage-speed-guage.component";
import { HalftDoughnutComponent } from "../half-doughnut/half-doughnut.component";
import { BarWithBackgroundComponent } from "../bar-with-background/bar-with-background";
import { AxisLineWithTickBarComponent } from "../axis-line-with-tick/axis-line-with-tick-bar";
import { StackedLineChartComponent } from "../stacked-line-chart/stacked-line-chart";
import { SetStyleOfSingleBarComponent } from "../set-style-of-single-bar/set-style-of-single-bar";
import { WaterfallChartBarComponent } from "../waterfall-chart-bar/waterfall-chart-bar";
import { StackedBarWithBorderComponent } from "../stacked-bar-with-border/stacked-bar-with-border";
import { StackedBarWithBorderTwoComponent } from "../stacked-bar-with-border-two/stacked-bar-with-border-two";
import { RefererOfWebsitePieComponent } from "../referer-of-website-pie/referer-of-website-pie";
import { PieWithPadAngleComponent } from "../pie-with-padAngle/pie-with-padAngle";
import { SmoothLineChartComponent } from "../smooth-line-chart/smooth-line-chart.component";
import { StackedAreaChartComponent } from '../stacked-area-chart/stacked-area-chart.component';
import { DynamicDataPlusTimeAxisChartComponent } from "../dynamic-data-plus-time-axis/dynamic-data-plus-time-axis.component";
import { StackedHorizotalBarChartComponent } from "../stacked-hzl-bar/stacked-hzl-bar.component";


@Component({
    selector: 'app-medium-card',
    standalone: true,
    imports: [BasicBarComponent, LineChartComponent, BasicLineChartComponent, SankeyChartComponent, StageSpeedGuageComponent, HalftDoughnutComponent, BarWithBackgroundComponent, AxisLineWithTickBarComponent, StackedLineChartComponent, SetStyleOfSingleBarComponent, WaterfallChartBarComponent, StackedBarWithBorderComponent, StackedBarWithBorderTwoComponent, RefererOfWebsitePieComponent, PieWithPadAngleComponent, SmoothLineChartComponent, SmoothLineChartComponent, StackedAreaChartComponent, DynamicDataPlusTimeAxisChartComponent, StackedHorizotalBarChartComponent],
    templateUrl: './medium-card.component.html',
    styleUrl: './medium-card.component.css',
})
export class MediumCardComponent {
    
    @Input() chart: any = '';
    @Input() metric: any = '';
    @Input() status: any = '';
    @Input() location: any = '';


    
    weeklyBarXData = [
                    '00:00',
                    '01:00',
                    '02:00',
                    '03:00',
                    '04:00',
                    '05:00',
                    '06:00',
                    '07:00',
                    '08:00',
                    '09:00',
                    '10:00',
                    '11:00',
                    '12:00',
                    '13:00',
                    '14:00',
                    '15:00',
                    '16:00',
                    '17:00',
                    '18:00',
                    '19:00',
                    '20:00',
                    '21:00',
                    '22:00',
                    '23:00',
                ];
    weeklyBarYData = [
                    120, 118, 115, 113, 110, 112, 118, 125, 130, 138, 142, 145,
                    148, 150, 147, 143, 140, 138, 135, 132, 130, 128, 125, 90,
                ];


    seriesData = [
  {
    name: 'A',
    type: 'bar',
    stack: 'a',
    data: [120, 200, 150, 80, 70, 110, 130]
  },
  {
    name: 'B',
    type: 'bar',
    stack: 'a',
    data: [10, 46, 64, '-', 0, '-', 0]
  },
  {
    name: 'C',
    type: 'bar',
    stack: 'a',
    data: [30, '-', 0, 20, 10, '-', 0]
  },
  {
    name: 'D',
    type: 'bar',
    stack: 'b',
    data: [30, '-', 0, 20, 10, '-', 0]
  },
  {
    name: 'E',
    type: 'bar',
    stack: 'b',
    data: [10, 20, 150, 0, '-', 50, 10]
  }
];
}

