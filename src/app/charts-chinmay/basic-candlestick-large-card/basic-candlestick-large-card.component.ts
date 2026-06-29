import { Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-basicCandlestick-large-card',
    standalone: true,
    imports: [],
    templateUrl: './basic-candlestick-large-card.component.html',
    styleUrl: './basic-candlestick-large-card.component.css',
})
export class BasicCandleStickLargeCardComponent {
    @ViewChild('chartContainer', { static: true })
  chartContainer!: ElementRef;

  @Input() title = '';

  @Input() xAxisData: string[] = [];

  /**
   * Format:
   * [open, close, low, high]
   */
  @Input() chartData: number[][] = [];

  @Input() height = '400px';

  private chart!: echarts.ECharts;

  ngAfterViewInit(): void {
    // this.chartContainer.nativeElement.style.height = this.height;

    this.chart = echarts.init(this.chartContainer.nativeElement);

    this.loadChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      this.loadChart();
    }
  }

  loadChart() {

    const option: echarts.EChartsOption = {

      title: {
        text: this.title,
        left: 'center'
      },

      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },

      grid: {
        left: 60,
        right: 30,
        bottom: 30,
        top: 60
      },

      xAxis: {
        type: 'category',
        data: this.xAxisData,
        boundaryGap: true,
        axisLine: {
          lineStyle: {
            color: '#555'
          }
        }
      },

      yAxis: {
        type: 'value',
        scale: true,
        axisLine: {
          lineStyle: {
            color: '#555'
          }
        },
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
      },

      series: [
        {
          type: 'candlestick',

          data: this.chartData,

          itemStyle: {

            color: '#00B050',

            color0: '#E53935',

            borderColor: '#00B050',

            borderColor0: '#E53935'
          }
        }
      ]
    };

    this.chart.setOption(option);
  }

  @HostListener('window:resize')
  onResize() {
    this.chart?.resize();
  }

  ngOnDestroy(): void {
    this.chart?.dispose();
  }
}

