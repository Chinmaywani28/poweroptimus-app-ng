import { Component, ElementRef, HostListener, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-dynamic-data-plus-time-axis',
    standalone: true,
    imports: [],
    templateUrl: './dynamic-data-plus-time-axis.component.html',
    styleUrl: './dynamic-data-plus-time-axis.component.css',
})
export class DynamicDataPlusTimeAxisChartComponent {
    @ViewChild('chartContainer', { static: true })
  chartContainer!: ElementRef;

  @Input() title = 'Dynamic Data';
  @Input() seriesName = 'Sensor Data';

  @Input() chartData: any[] = [];

  private chartInstance!: echarts.ECharts;

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['chartData'] &&
      this.chartInstance
    ) {
      this.updateChart();
    }
  }

  initChart() {
    this.chartInstance = echarts.init(
      this.chartContainer.nativeElement
    );

    this.chartInstance.setOption({
      title: {
        text: this.title,
      },

      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false,
        },
      },

      // grid: {
      //   left: '3%',
      //   right: '3%',
      //   top: '15%',
      //   bottom: '8%',
      //   containLabel: true,
      // },
      grid: { left: '10%', right: '5%', bottom: '20%', top: '10%' },


      xAxis: {
        type: 'time',
        splitLine: {
          show: false,
        },
      },

      // yAxis: {
      //   type: 'value',
      //   boundaryGap: [0, '20%'],
      // },

      yAxis: {
  type: 'value',
  boundaryGap: [0, '100%'],
  splitLine: {
    show: false
  }
},

      series: [
{
  name: this.seriesName,
  type: 'line',
  smooth: false,
  showSymbol: false,
  hoverAnimation: false,
  data: this.chartData
}
]
    });
  }

  updateChart() {
    this.chartInstance.setOption({
      animation: false,
      series: [
        {
          data: this.chartData,
        },
      ],
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.chartInstance?.resize();
  }

}

