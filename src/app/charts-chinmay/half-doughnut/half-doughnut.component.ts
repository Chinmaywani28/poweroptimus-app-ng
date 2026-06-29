import { Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-half-doughnut',
    standalone: true,
    imports: [],
    templateUrl: './half-doughnut.component.html',
    styleUrl: './half-doughnut.component.css',
})
export class HalftDoughnutComponent {
  @ViewChild('chartContainer')
  chartContainer!: ElementRef;

  chartInstance!: echarts.ECharts;

  ngAfterViewInit(): void {

    this.initChart();
  }

  // Initialize chart
  initChart() {

    this.chartInstance = echarts.init(
      this.chartContainer.nativeElement
    );

    this.chartInstance.setOption(
      this.getChartOption()
    );
  }

  // Chart option
  getChartOption(): echarts.EChartsOption {

    return {

      title: {
  // text: 'Building Energy Consumption',
  left: 'center',
  top: 0,
  bottom: 0,

  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  }
},

      tooltip: {
        trigger: 'item'
      },

      legend: {

        bottom: 20,

        icon: 'circle',

        textStyle: {
          fontSize: 12
        }
      },

      series: [


        {
          name: 'Energy Sources',

          type: 'pie',

          radius: ['60%', '75%'],

          center: ['50%', '50%'],

          // ✅ Makes half doughnut
          startAngle: 180,

          label: {

            show: true,

            formatter: '{b}\n{d}%',

            fontSize: 11
          },

          itemStyle: {

            borderColor: '#fff',

            borderWidth: 2,

            borderRadius: 8
          },

          data: [

            {
              value: 45,
              name: 'Grid Utility',

              itemStyle: {
                color: '#42a5f5'
              }
            },

            {
              value: 30,
              name: 'Solar PV',

              itemStyle: {
                color: '#fdd835'
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
            },

            // ✅ Invisible half
            {
              value: 100,

              itemStyle: {
                color: 'none',
                decal: {
                  symbol: 'none'
                }
              },

              label: {
                show: false
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

