import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TemperatureChartWidgetComponent } from '../compoents-home/temperature-chart-widget/temperature-chart-widget.component';
import { TemperatureChartWidgetTimeComponent } from "../compoents-home/temperature-chart-widget-time/temperature-chart-widget-time.component";
import { Subscription } from 'rxjs';
import { WidgetService } from '../common/services/widget.service';
import * as echarts from 'echarts';
import { TemperatureChartWidgetTimeTwoComponent } from "../compoents-home/temperature-chart-widget-time-two/temperature-chart-widget-time.component-two";
import { LiveChartComponent } from "../compoents-home/live-chart/live-chart.component";
import { BasicBarComponent } from "../charts-chinmay/basic-bar/basic-bar.component";
import { HeatMapComponent } from '../charts-chinmay/heatmap/heatmap.component';
import { StageSpeedGuageComponent } from "../charts-chinmay/stage-speed-guage/stage-speed-guage.component";
import { LineChartComponent } from "../charts-chinmay/line-chart/line-chart.component";

@Component({
    selector: 'app-home-default-three',
    standalone: true,
    imports: [
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    TemperatureChartWidgetComponent,
    TemperatureChartWidgetTimeComponent,
    TemperatureChartWidgetTimeTwoComponent,
    LiveChartComponent,
    HeatMapComponent,
    StageSpeedGuageComponent,
    LineChartComponent,
    BasicBarComponent
],
    templateUrl: './home-default-three.component.html',
    styleUrl: './home-default-three.component.scss',
})
export class HomeDefaultThreeComponent {
    constructor(private floorService: WidgetService) {}

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
                    // '12:00',
                    // '13:00',
                    // '14:00',
                    // '15:00',
                    // '16:00',
                    // '17:00',
                    // '18:00',
                    // '19:00',
                    // '20:00',
                    // '21:00',
                    // '22:00',
                    // '23:00',
                ];
    weeklyBarYData = [
                    120, 118, 115, 113, 110, 112, 118, 125, 130, 138, 142, 145,
                    // 148, 150, 147, 143, 140, 138, 135, 132, 130, 128, 125, 90,
                ];
}

