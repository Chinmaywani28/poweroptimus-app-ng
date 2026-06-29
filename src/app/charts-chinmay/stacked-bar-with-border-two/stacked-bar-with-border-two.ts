import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-stacked-bar-with-border-two',
    standalone: true,
    imports: [],
    templateUrl: './stacked-bar-with-border-two.html',
    styleUrl: './stacked-bar-with-border-two.css',
})
export class StackedBarWithBorderTwoComponent {
  @ViewChild('chartRef', { static: true })
  chartRef!: ElementRef;

  // X-axis labels
  @Input() categories: string[] = [];

  // ECharts series
  @Input() seriesData: any[] = [];

  // Optional customization
  @Input() borderRadius = 12;
  @Input() barWidth = '50%';

  private chart!: echarts.ECharts;

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (
      this.chart &&
      (changes['categories'] || changes['seriesData'])
    ) {
      this.updateChart();
    }
  }

  private initChart(): void {

    this.chart = echarts.init(
      this.chartRef.nativeElement
    );

    this.updateChart();

    window.addEventListener('resize', this.resizeChart);
  }

  private resizeChart = () => {
    this.chart?.resize();
  };

  private updateChart(): void {

    const processedSeries =
      this.prepareStackedSeries(this.seriesData);

    const option: echarts.EChartsOption = {

      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },

      // legend: {
      //   top: 0,
      //   // left: 25
      // },

      grid: {
        // left: '3%',
        // right: '4%',
        // bottom: '3%',
         left: '10%', right: '5%', bottom: '10%', top: '10%',
        containLabel: true
      },

      xAxis: {
        type: 'category',
        data: this.categories
      },

      yAxis: {
        type: 'value'
      },

      series: processedSeries
    };

    this.chart.setOption(option, true);
  }

  private prepareStackedSeries(series: any[]): any[] {

    if (!series?.length) {
      return [];
    }

    const clonedSeries =
      JSON.parse(JSON.stringify(series));

    const stackInfo: any = {};

    // Find top series of every stack
    for (let i = 0; i < clonedSeries[0].data.length; i++) {

      for (let j = 0; j < clonedSeries.length; j++) {

        const stackName = clonedSeries[j].stack;

        if (!stackName) {
          continue;
        }

        if (!stackInfo[stackName]) {
          stackInfo[stackName] = {
            stackStart: [],
            stackEnd: []
          };
        }

        const info = stackInfo[stackName];
        const value = clonedSeries[j].data[i];

        if (
          value !== '-' &&
          value !== null &&
          value !== undefined
        ) {

          if (info.stackStart[i] == null) {
            info.stackStart[i] = j;
          }

          info.stackEnd[i] = j;
        }
      }
    }

    // Apply border radius only to top visible bar
    for (let i = 0; i < clonedSeries.length; i++) {

      const info =
        stackInfo[clonedSeries[i].stack];

      if (!info) {
        continue;
      }

      for (let j = 0; j < clonedSeries[i].data.length; j++) {

        const isEnd =
          info.stackEnd[j] === i;

        clonedSeries[i].data[j] = {
          value: clonedSeries[i].data[j],
          itemStyle: {
            borderRadius: isEnd
              ? [
                  this.borderRadius,
                  this.borderRadius,
                  0,
                  0
                ]
              : [0, 0, 0, 0]
          }
        };
      }

      clonedSeries[i].barWidth =
        this.barWidth;
    }

    return clonedSeries;
  }

  ngOnDestroy(): void {

    window.removeEventListener(
      'resize',
      this.resizeChart
    );

    this.chart?.dispose();
  }
}

