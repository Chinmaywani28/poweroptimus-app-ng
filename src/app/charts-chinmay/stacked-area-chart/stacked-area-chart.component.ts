import { Component, ElementRef, HostListener, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-stacked-area-chart',
    standalone: true,
    imports: [],
    templateUrl: './stacked-area-chart.component.html',
    styleUrl: './stacked-area-chart.component.css',
})
export class StackedAreaChartComponent {
    @ViewChild('chartContainer')
  chartContainer!: ElementRef;

  @Input() chartData!: any;

  chartInstance!: echarts.ECharts;

  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart() {
    if (!this.chartContainer?.nativeElement) return;

    this.chartInstance = echarts.init(
      this.chartContainer.nativeElement
    );

    const option = this.getChartOption();

    this.chartInstance.setOption(option);
  }

  getChartOption(): echarts.EChartsOption {
    return {
      title: {
        text: this.chartData?.title || ''
      },

      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },

      legend: {
        // top: 0,
        // data: this.chartData.series.map(
        //   (item: any) => item.name
        // )
        show: false
      },
      grid: { left: '10%', right: '5%', bottom: '20%', top: '10%' },


      // grid: {
      //   left: '3%',
      //   right: '4%',
      //   bottom: '3%',
      //   containLabel: true
      // },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.chartData.categories
      },

      yAxis: {
        type: 'value'
      },

      series: this.chartData.series.map(
        (item: any) => ({
          name: item.name,
          type: 'line',
          stack: 'Total',

          areaStyle: {},

          emphasis: {
            focus: 'series'
          },

          smooth: true,

          data: item.data,

          lineStyle: {
            width: 2
          },

          itemStyle: {
            color: item.color
          }
        })
      )
    };
  }

  @HostListener('window:resize')
  onResize() {
    this.chartInstance?.resize();
  }
}

