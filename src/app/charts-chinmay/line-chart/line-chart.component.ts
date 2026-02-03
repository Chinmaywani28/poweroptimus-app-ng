import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-line-chart',
    standalone: true,
    imports: [],
    templateUrl: './line-chart.component.html',
    styleUrl: './line-chart.component.css',
})
export class LineChartComponent {
   @ViewChild('chartContainer') chartContainer!: ElementRef;

  // X axis labels (time / hours / days)
  @Input() xAxisData: string[] = [];

  // Y axis values
  @Input() seriesData: number[] = [];

  // Axis name
  @Input() xName: string = 'Time';
  @Input() yName: string = 'Value';

  private chartInstance!: echarts.ECharts;

  ngAfterViewInit() {
    this.initChart();
  }

  ngOnChanges() {
    if (this.chartInstance) {
      this.setChartOption();
    }
  }

  private initChart() {
    this.chartInstance = echarts.init(this.chartContainer.nativeElement);
    this.setChartOption();

    // ✅ Auto resize with card
    window.addEventListener('resize', () => {
      this.chartInstance.resize();
    });
  }

  private setChartOption() {
    const option: echarts.EChartsOption = {
      grid: {
        top: 30,
        left: 10,
        right: 10,
        bottom: 40,
        containLabel: true // ✅ prevents label cut
      },

      tooltip: {
        trigger: 'axis'
      },

      xAxis: {
        type: 'category',
        name: this.xName,
        data: this.xAxisData,
        axisLabel: {
          rotate: 0, // change to 45 if labels are long
          fontSize: 11
        },
        nameLocation: 'middle',    // center it
        nameGap: 24,
      },

      yAxis: {
        type: 'value',
        name: this.yName,
        axisLabel: {
          fontSize: 11
        }
      },

      series: [
        {
          type: 'line',
          data: this.seriesData,
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: {
            width: 2
          },
          areaStyle: {
            opacity: 0.1 // soft fill
          }
        }
      ]
    };

    this.chartInstance.setOption(option);
  }
}

