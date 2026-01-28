import { Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-stage-speed-guage',
    standalone: true,
    imports: [],
    templateUrl: './stage-speed-guage.component.html',
    styleUrl: './stage-speed-guage.component.css',
})
export class StageSpeedGuageComponent {
   @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  @Input() refreshInterval = 5000; // ms
  @Input() min = 0;
  @Input() max = 100;
  @Input() unit = 'km/h';
  @Input() data = []

  private chartInstance!: echarts.ECharts;
  private intervalId: any;

  ngOnInit(): void {
    this.initChart();
    // this.startAutoUpdate();
    // console.log('nkjhl',this.data)
  }

  ngOnChanges(){
    // console.log('receiving from child',this.data)
    if(this.data.length){
        this.initChart()
    }

  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    if (this.chartInstance) this.chartInstance.dispose();
  }

  private initChart(): void {
    this.chartInstance = echarts.init(this.chartContainer.nativeElement);
    const option: echarts.EChartsOption = {
      series: [
        {
          type: 'gauge',
          min: this.min,
          max: this.max,
        radius: '70%', // 🔽 Reduced size
        center: ['45%', '60%'], // 🔽 Move it a bit down for better visual balance
          axisLine: {
            lineStyle: {
              width: 30,
              color: [
                [0.3, '#67e0e3'],
                [0.7, '#37a2da'],
                [1, '#fd666d']
              ]
            }
          },
          pointer: {
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            distance: -30,
            length: 8,
            lineStyle: {
              color: '#fff',
              width: 2
            }
          },
          splitLine: {
            distance: -30,
            length: 30,
            lineStyle: {
              color: '#fff',
              width: 4
            }
          },
          axisLabel: {
            color: 'inherit',
            distance: 40,
            fontSize: 12
          },
          detail: {
            valueAnimation: true,
            formatter: `{value} ${this.unit}`,
            color: 'inherit',
            fontSize: 15 // 🔽 Slightly smaller font if needed
          },
        //   data: [{ value: 70 }]
          data: this.data
        }
      ]
    };

    this.chartInstance.setOption(option);
  }


  

  

  private startAutoUpdate(): void {
    this.intervalId = setInterval(() => {
      const value = +(Math.random() * this.max).toFixed(2);
      console.log('afdnbv',value)
      this.chartInstance.setOption({
        series: [
          {
            data: [{ value }]
          }
        ]
      });
    }, this.refreshInterval);
  }
}

