import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import { BasicBarComponent } from "../basic-bar/basic-bar.component";
import { LineChartComponent } from "../line-chart/line-chart.component";

@Component({
    selector: 'app-small-card',
    standalone: true,
    imports: [],
    templateUrl: './small-card.component.html',
    styleUrl: './small-card.component.css',
})
export class SmallCardComponent {
    
    @Input() metric: any = 'Pressure';
    @Input() value: any = '50';
    @Input() unit: any = 'psi';
    @Input() location: any = ' Tank A,Production Hall, Main Plant';



    
    
}

