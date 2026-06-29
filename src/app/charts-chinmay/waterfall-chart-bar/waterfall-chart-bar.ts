import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-waterfall-chart-bar',
    standalone: true,
    imports: [],
    templateUrl: './waterfall-chart-bar.html',
    styleUrl: './waterfall-chart-bar.css',
})
export class WaterfallChartBarComponent {
  @Input() categories: string[] = [];
  @Input() data: number[] = [];
  @Input() title: string = 'Waterfall Chart';
  @Input() height: number = 400;
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef<HTMLDivElement>;

  private chartInstance?: echarts.ECharts;

  ngAfterViewInit() {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chartInstance && (changes['categories'] || changes['data'])) {
      this.setOptions();
    }
  }

  ngOnDestroy() {
    this.chartInstance?.dispose();
  }

  private initChart() {
    this.chartInstance = echarts.init(this.chartContainer.nativeElement);
    this.setOptions();

    window.addEventListener('resize', this.onResize);
  }

  private setOptions() {
    if (!this.chartInstance) return;

    const baseData: any[] = [];
    let sum = 0;
    const totals = this.data.map((value) => {
      sum += value;
      return sum;
    });

    for (let i = 0; i < this.data.length; i++) {
      baseData.push({
        value: totals[i] - this.data[i],
        itemStyle: { color: 'transparent' },
        tooltip: { show: false }
      });
    }

    const option = {
      // title: { text: this.title },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: any) => {
          const param = params[1];
          return `${param.name}<br/>${param.seriesName}: ${param.value}`;
        }
      },
      xAxis: {
        type: 'category',
        data: this.categories,
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value'
      },
      // grid: {
      //   left: '3%',
      //   right: '4%',
      //   bottom: '3%',
      //   containLabel: true
      // },
      grid: { left: '10%', right: '5%', bottom: '20%', top: '10%' },
      series: [
        {
          name: '辅助',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent'
          },
          emphasis: { itemStyle: { color: 'transparent' } },
          data: baseData,
          barWidth: '20%' // ⬅ match width here too
        },
        {
          name: '金额',
          type: 'bar',
          stack: '总量',
          label: {
            show: true,
            position: 'top',
            formatter: (params: any) => {
              return params.value;
            }
          },
          data: this.data,
           barWidth: '20%' // ⬅ match width here too
        }
      ]
    };

    this.chartInstance.setOption(option, true);
  }

  private onResize = () => {
    this.chartInstance?.resize();
  }
}

