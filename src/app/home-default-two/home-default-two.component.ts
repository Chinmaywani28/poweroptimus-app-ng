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
    selector: 'app-home-default-two',
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
        BasicBarComponent,
        LineChartComponent,
    ],
    templateUrl: './home-default-two.component.html',
    styleUrl: './home-default-two.component.scss',
})
export class HomeDefaultTwoComponent {
    constructor(private floorService: WidgetService) {}

    weeklyBarXData: any;
    weeklyBarYData: any 
sevenBarXData: any 

sevenBarYData: any 

    StageSpeedGuagedata: any 

    monthBarXData: any
    monthBarYData: any 
    flllorr: any 

    
    ngOnInit() {
        // weekly bar chart
        this.floorService.fetchWeeklyEnergy().subscribe((resp: any) => {
            console.log('jkl::', resp);
            // this.weeklyBarXData = resp.xAxis
            // this.weeklyBarYData = resp.series
        });


        this.floorService.selectedFloor$.subscribe((floor) => {
            console.log('nkhohh::',floor)
            this.flllorr = floor

            setTimeout(() => {
                if (this.flllorr) {
                this.weeklyBarXData = [
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
                this.weeklyBarYData = [
                    120, 118, 115, 113, 110, 112, 118, 125, 130, 138, 142, 145,
                    148, 150, 147, 143, 140, 138, 135, 132, 130, 128, 125, 90,
                ];

                // this.StageSpeedGuagedata = [
                //     // { timestamp: '14:01', value: 120 },
                //     // { timestamp: '14:02', value: 118 },
                //     // { timestamp: '14:03', value: 121 },
                //     // { timestamp: '14:04', value: 119 },
                //     { timestamp: '14:05', value: 122 },
                // ]; 

                this.StageSpeedGuagedata = [
                    // { timestamp: '14:01', value: 120 },
                    // { timestamp: '14:02', value: 118 },
                    // { timestamp: '14:03', value: 121 },
                    // { timestamp: '14:04', value: 119 },
                    { value: 122 },
                ]; 

                this.monthBarXData = [
                    'Day 1',
                    'Day 2',
                    'Day 3',
                    'Day 4',
                    'Day 5',
                    'Day 6',
                    'Day 7',
                    'Day 8',
                    'Day 9',
                    'Day 10',
                    'Day 11',
                    'Day 12',
                    'Day 13',
                    'Day 14',
                    'Day 15',
                    'Day 16',
                    'Day 17',
                    'Day 18',
                    'Day 19',
                    'Day 20',
                    'Day 21',
                    'Day 22',
                    'Day 23',
                    'Day 24',
                    'Day 25',
                    'Day 26',
                    'Day 27',
                    'Day 28',
                    'Day 29',
                    'Day 30',
                ];

                this.monthBarYData = [
                    116, 138, 135, 136, 123, 103, 119, 119, 110, 142, 148, 142,
                    157, 143, 123, 119, 109, 128, 130, 139, 121, 145, 141, 103,
                    109, 141, 105, 124, 107, 128,
                ];

                this.sevenBarXData= [120,135,128,140,145,138,130]
                this.sevenBarYData= [120,135,128,140,145,138,130]


            }
            },0)

            
            
        });
        
    }
    

    ngOnViewInit() {}
}

