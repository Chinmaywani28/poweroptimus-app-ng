import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import { BasicBarComponent } from "../basic-bar/basic-bar.component";
import { LineChartComponent } from "../line-chart/line-chart.component";

@Component({
    selector: 'app-medium-card',
    standalone: true,
    imports: [BasicBarComponent, LineChartComponent],
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
}

