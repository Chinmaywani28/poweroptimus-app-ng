import { Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-force-layout-large-card',
    standalone: true,
    imports: [],
    templateUrl: './force-layout-large-card.component.html',
    styleUrl: './force-layout-large-card.component.css',
})
export class ForceLayoutLargeCardComponent {
  @ViewChild('chartContainer', { static: true })
  chartContainer!: ElementRef;

  @Input() title = '';

  @Input() nodes: any[] = [];

  @Input() links: any[] = [];

  @Input() height = '400px';

  @Input() repulsion = 300;

  @Input() edgeLength = 120;

  private chart!: echarts.ECharts;

  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart(): void {
    this.chart = echarts.init(this.chartContainer.nativeElement);

    const option: echarts.EChartsOption = {
      title: {
        text: this.title,
        left: 'center'
      },

      tooltip: {
        trigger: 'item'
      },

      animation: true,

      series: [
        {
          type: 'graph',
          layout: 'force',

          roam: true,

          draggable: true,

          data: this.nodes,

          links: this.links,

          label: {
            show: true,
            position: 'right'
          },

          lineStyle: {
            color: '#999',
            width: 1.5,
            opacity: 0.8
          },

          force: {
            repulsion: this.repulsion,
            edgeLength: this.edgeLength
          }
        }
      ]
    };

    this.chart.setOption(option);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.chart?.resize();
  }
}

