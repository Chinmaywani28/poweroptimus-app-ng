import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-axis-line-with-tick-bar',
    standalone: true,
    imports: [],
    templateUrl: './axis-line-with-tick-bar.html',
    styleUrl: './axis-line-with-tick-bar.css',
})
export class AxisLineWithTickBarComponent {
   @Input() categories: string[] = [];
     @Input() values: any[] = [];
     // values may contain obj with mul key pair
     @Input() maxValue = 100;
   
     @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
     private chartInstance!: echarts.ECharts;
   
     constructor() {}

     ngOnChanges(changes: SimpleChanges): void {
       if (this.chartInstance) {
         this.updateChart();
       }
     }
   
     ngOnInit(): void {}
   
     ngAfterViewInit(): void {
       this.initChart();
       window.addEventListener('resize', this.resizeChart);
     }
   
     
   
     private initChart(): void {
       this.chartInstance = echarts.init(this.chartContainer.nativeElement);
       this.updateChart();
     }
   
     private updateChart(): void {

        const option: echarts.EChartsOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
            },
            grid: {
                left: '10%',
                right: '5%',
                bottom: '10%',
                top: '5%',
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true,
                    },
                },
            ],
            yAxis: [
                {
                    type: 'value',
                },
            ],
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '30%',
                    data: [200, 52, 200, 334, 390, 330, 220],
                },
            ],
        };
     
   
       this.chartInstance.setOption(option);
     }
   
     private resizeChart = () => {
       if (this.chartInstance) {
         this.chartInstance.resize();
       }
     };
   
     ngOnDestroy(): void {
       window.removeEventListener('resize', this.resizeChart);
       if (this.chartInstance) {
         this.chartInstance.dispose();
       }
     }
}

