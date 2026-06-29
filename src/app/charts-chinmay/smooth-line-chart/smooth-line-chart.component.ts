import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-smooth-line-chart',
    standalone: true,
    imports: [],
    templateUrl: './smooth-line-chart.component.html',
    styleUrl: './smooth-line-chart.component.css',
})
export class SmoothLineChartComponent {
   @ViewChild('chartRef', { static: true })
  chartRef!: ElementRef;

  @Input() title = '';

  @Input() data!: {
    labels: string[];
    values: number[];
  };

  chartInstance!: echarts.ECharts;

  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart(): void {

    this.chartInstance = echarts.init(
      this.chartRef.nativeElement
    );

    const option: echarts.EChartsOption = {
      grid: { left: '10%', right: '5%', bottom: '20%', top: '10%' },

      tooltip: {
        trigger: 'axis'
      },

      // grid: {
      //   left: 10,
      //   right: 10,
      //   top: 20,
      //   bottom: 20,
      //   containLabel: true
      // },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.data.labels,
        axisLine: {
          lineStyle: {
            color: '#C7D2D9'
          }
        }
      },

      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: '#EEF2F5'
          }
        }
      },

      series: [
        {
          type: 'line',

          smooth: true,

          symbol: 'circle',

          symbolSize: 8,

          data: this.data.values,

          lineStyle: {
            width: 4,
            color: '#00B4D8'
          },

          itemStyle: {
            color: '#0096C7',
            borderWidth: 2,
            borderColor: '#fff'
          },

          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0,180,216,0.35)'
                },
                {
                  offset: 1,
                  color: 'rgba(0,180,216,0.02)'
                }
              ]
            )
          }
        }
      ]
    };

    this.chartInstance.setOption(option);

    window.addEventListener('resize', () => {
      this.chartInstance?.resize();
    });
  }
}

