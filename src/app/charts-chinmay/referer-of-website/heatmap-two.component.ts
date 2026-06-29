import { Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-referer',
    standalone: true,
    imports: [],
    templateUrl: './heatmap-two.component.html',
    styleUrl: './heatmap-two.component.css',
})
export class RefererComponent {
  @ViewChild('chartContainer')
  chartContainer!: ElementRef;

  chartInstance!: echarts.ECharts;

  ngAfterViewInit(): void {

    this.initChart();
  }

  initChart() {

    this.chartInstance = echarts.init(
      this.chartContainer.nativeElement
    );

    this.chartInstance.setOption(
      this.getChartOption()
    );
  }

  getChartOption(): echarts.EChartsOption {

    return {

      tooltip: {
        trigger: 'item'
      },

      legend: {

        bottom: 0,

        icon: 'circle',

        textStyle: {
          fontSize: 12
        }
      },

      series: [

        {
          name: 'Energy Source',

          type: 'pie',

          radius: ['45%', '75%'],

          center: ['50%', '45%'],

          avoidLabelOverlap: true,

          itemStyle: {
            borderRadius: 8,
            borderColor: '#fff',
            borderWidth: 2
          },

          label: {

            show: true,

            formatter: '{b}\n{d}%',

            fontSize: 12
          },

          emphasis: {

            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold'
            }
          },

          data: [

            {
              value: 35,
              name: 'Solar PV',
              itemStyle: {
                color: '#fdd835'
              }
            },

            {
              value: 40,
              name: 'Grid Utility',
              itemStyle: {
                color: '#42a5f5'
              }
            },

            {
              value: 15,
              name: 'DG Backup',
              itemStyle: {
                color: '#ef5350'
              }
            },

            {
              value: 10,
              name: 'Battery Storage',
              itemStyle: {
                color: '#66bb6a'
              }
            }
          ]
        }
      ]
    };
  }

  // Responsive resize
  @HostListener('window:resize')
  onResize() {

    this.chartInstance?.resize();
  }
}

