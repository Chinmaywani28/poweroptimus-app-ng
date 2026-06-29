import { Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-doughnut-chart-large-card',
    standalone: true,
    imports: [],
    templateUrl: './doughnut-chart-large-card.component.html',
    styleUrl: './doughnut-chart-large-card.component.css',
})
export class DoughnutChartLargeCardComponent {
  @ViewChild('chartContainer')
  chartContainer!: ElementRef;

  @Input() title = '';
  @Input() centerText = '';
  @Input() showLegend = true;

  @Input() innerRadius = '45%';
  @Input() outerRadius = '75%';

  @Input() data: any[] = [];

  chartInstance!: echarts.ECharts;

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnChanges(): void {
    if (this.chartInstance) {
      this.setOptions();
    }
  }

  initChart() {
    this.chartInstance = echarts.init(
      this.chartContainer.nativeElement
    );

    this.setOptions();
  }

  setOptions() {
    const option = {
      tooltip: {
        trigger: 'item'
      },

      legend: this.showLegend
        ? {
            bottom: 0,
            icon: 'circle'
          }
        : undefined,

      color: [
        '#1e1f20',
        '#91CC75',
        '#FAC858',
        '#EE6666',
        '#73C0DE',
        '#3BA272',
        '#FC8452',
        '#9A60B4'
      ],

      graphic: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: this.centerText,
            fontSize: 18,
            fontWeight: 'bold',
            fill: '#333'
          }
        }
      ],

      series: [
        {
          type: 'pie',

          radius: [
            this.innerRadius,
            this.outerRadius
          ],

          avoidLabelOverlap: false,

          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 3
          },

          label: {
            show: false
          },

          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold'
            }
          },

          labelLine: {
            show: false
          },

          data: this.data
        }
      ]
    };

    this.chartInstance.setOption(option);
  }

  @HostListener('window:resize')
  onResize() {
    this.chartInstance?.resize();
  }
}

