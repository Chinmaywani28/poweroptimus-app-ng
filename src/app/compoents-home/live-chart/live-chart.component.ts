import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as echarts from 'echarts';

@Component({
    standalone: true,
    selector: 'app-live-chart-component',
    imports: [],
    templateUrl: './live-chart.component.html',
    styleUrl: './live-chart.component.css',
})
export class LiveChartComponent {
    
}
