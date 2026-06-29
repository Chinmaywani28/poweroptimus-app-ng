import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-stacked-bar-with-border',
    standalone: true,
    imports: [],
    templateUrl: './stacked-bar-with-border.html',
    styleUrl: './stacked-bar-with-border.css',
})
export class StackedBarWithBorderComponent {


  @ViewChild('chartContainer', { static: false })
  chartRef!: ElementRef;

    @Input() categories: string[] = [];
  @Input() seriesData: any = [];

  private chartInstance: echarts.ECharts | null = null;
  resizeObserver!: ResizeObserver;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart(): void {


    const chartDom = this.chartRef.nativeElement;

  this.chartInstance = echarts.init(chartDom);

    // const chartDom = this.elRef.nativeElement.querySelector('#stackedBarChart');
    // this.chartInstance = echarts.init(chartDom);

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {},
      // grid: {
      //   left: '3%',
      //   right: '4%',
      //   bottom: '3%',
      //   containLabel: true,
      // },
      grid: { left: '10%', right: '5%', bottom: '20%', top: '10%' },
      xAxis: {
        type: 'category',
        data: this.categories,
      },
      yAxis: {
        type: 'value',
      },
      // flip the X & Y for hori and ver resp
      series: this.seriesData.map((s: any) => ({
        name: s.name,
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          borderWidth: 1,
          borderColor: '#333',
          color: s.color || undefined,
        },
        data: s.data,
      })),
    };

    this.chartInstance.setOption(option);

    // Handle responsive behavior
    this.resizeObserver = new ResizeObserver(() => {
      this.chartInstance?.resize();
    });
    this.resizeObserver.observe(chartDom);
  }

  ngOnDestroy(): void {
    this.chartInstance?.dispose();
    this.resizeObserver?.disconnect();
  }


}

