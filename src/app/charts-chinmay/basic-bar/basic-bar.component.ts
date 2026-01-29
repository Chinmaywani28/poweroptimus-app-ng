import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-basic-bar',
    standalone: true,
    imports: [],
    templateUrl: './basic-bar.component.html',
    styleUrl: './basic-bar.component.css',
})
export class BasicBarComponent {
    @Input() xaxisData: string[] = [];
    @Input() seriesData!: number[];
    @Input() xName!: any;
    @Input() axisAlignTick: boolean = false;
    @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;
    private chartInstance!: echarts.ECharts;

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        // setTimeout(() => {
        //     this.initChart();
        // }, 0);
        this.waitForSize();
    }

    ngOnChanges(changes: SimpleChanges): void {
        // if (this.chartInstance) {
        //     this.updateChart();
        // }
         if (!this.chartInstance) return;

         if (changes['xaxisData'] || changes['seriesData']) {
             this.updateChart();
         }
    }

    ngOnDestroy(): void {
        if (this.chartInstance) {
            this.chartInstance.dispose();
        }
    }

    private initChart(): void {
        const el = this.chartContainer.nativeElement;
        console.log('Width:', el.clientWidth, 'Height:', el.clientHeight);

        this.chartInstance = echarts.init(this.chartContainer.nativeElement);
        


         if (this.xaxisData?.length && this.seriesData?.length) {
             this.updateChart();
         }

        window.addEventListener('resize', this.resizeChart);
    }

    private updateChart(): void {
        const option = {
            xAxis: {
                type: 'category',
                data: this.xaxisData,
                // axisTick: {
                //   alignWithLabel: this.axisAlignTick
                // }
                // axis tick
                // name: this.xName, 
                 name: this.xName,          // "Hour"
                nameLocation: 'middle',    // center it
                nameGap: 26,    
            },
            yAxis: {
                type: 'value',
                name: 'kW',    
            },
            series: [
                {
                    data: this.seriesData,
                    type: 'bar',
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

    private waitForSize() {
        const el = this.chartContainer.nativeElement;

        if (el.clientWidth === 0) {
            requestAnimationFrame(() => this.waitForSize());
            return;
        }

        this.initChart();
    }
}

