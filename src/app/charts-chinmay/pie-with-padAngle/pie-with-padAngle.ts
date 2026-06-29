import { Component, ElementRef, HostListener, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-pie-with-padAngle',
    standalone: true,
    imports: [],
    templateUrl: './pie-with-padAngle.html',
    styleUrl: './pie-with-padAngle.css',
})
export class PieWithPadAngleComponent {
  @ViewChild('chartContainer', { static: true })
  chartContainer!: ElementRef;

  chartInstance!: echarts.ECharts;

  // Chart Title
  @Input() chartTitle = 'Access From';

  // Pie Data
  @Input() chartData = [
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' },
    { value: 484, name: 'Union Ads' },
    { value: 300, name: 'Video Ads' }
  ];

  // Inner & Outer Radius
  @Input() innerRadius = '20%';
  @Input() outerRadius = '50%';

  // Gap between slices
  @Input() padAngle = 5;

  // Rounded corners
  @Input() borderRadius = 10;

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartInstance) {
      this.loadChart();
    }
  }

  initChart(): void {
    this.chartInstance = echarts.init(
      this.chartContainer.nativeElement
    );

    this.loadChart();
  }

  loadChart(): void {
    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'item'
      },

      legend: {
        top: '2%',
        left: 'center'
      },

      series: [
        {
          name: this.chartTitle,
          type: 'pie',

          radius: [
            this.innerRadius,
            this.outerRadius
          ],

          avoidLabelOverlap: false,

          padAngle: this.padAngle,

          itemStyle: {
            borderRadius: this.borderRadius
          },

          label: {
            show: false,
            position: 'center'
          },

          emphasis: {
            label: {
              show: true,
              fontSize: 24,
              fontWeight: 'bold'
            }
          },

          labelLine: {
            show: false
          },

          data: this.chartData
        }
      ]
    };

    this.chartInstance.setOption(option);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.chartInstance?.resize();
  }
}

