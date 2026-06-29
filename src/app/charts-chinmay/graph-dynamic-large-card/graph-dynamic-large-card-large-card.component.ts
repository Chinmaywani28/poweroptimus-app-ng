import { Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-graph-dynamic-large-card',
    standalone: true,
    imports: [],
    templateUrl: './graph-dynamic-large-card-large-card.component.html',
    styleUrl: './graph-dynamic-large-card-large-card.component.css',
})
export class GraphDynamicLargeCardComponent {
    @ViewChild('chartContainer', { static: true })
  chartContainer!: ElementRef;

  @Input() title = 'Dynamic Graph';

  @Input() nodes: any[] = [];

  @Input() links: any[] = [];

  @Input() repulsion = 120;

  @Input() edgeLength = 40;

  @Input() roam = true;

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

          roam: this.roam,

          draggable: true,

          label: {
            show: true
          },

          force: {
            repulsion: this.repulsion,
            edgeLength: this.edgeLength
          },

          data: this.nodes,

          edges: this.links,

          lineStyle: {
            width: 2,
            opacity: 0.8
          }
        }
      ]
    };

    this.chart.setOption(option);
  }

  updateGraph(
    nodes: any[],
    links: any[]
  ): void {
    this.chart.setOption({
      series: [
        {
          data: nodes,
          edges: links
        }
      ]
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.chart?.resize();
  }

  ngOnDestroy(): void {
    this.chart?.dispose();
  }
}

