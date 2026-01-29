import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import { BasicBarComponent } from "../basic-bar/basic-bar.component";
import { LineChartComponent } from "../line-chart/line-chart.component";

@Component({
    selector: 'app-large-card',
    standalone: true,
    imports: [],
    templateUrl: './large-card.component.html',
    styleUrl: './large-card.component.css',
})
export class LargeCardComponent {
    
    @Input() chart: any = '';
    @Input() metric: any = '';
    @Input() status: any = '';
    @Input() location: any = '';

    
    
    
}

