import { Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-sankey',
    standalone: true,
    imports: [],
    templateUrl: './sankey.component.html',
    styleUrl: './sankey.component.css',
})
export class SankeyComponent {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef<HTMLDivElement>;
  @Input() title?: string = '';
  @Input() data: { name: string }[] = [];
  @Input() links: { source: string, target: string, value: number }[] = [];
  chartInstance!: echarts.ECharts;

  option: any

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.chartInstance) {
      this.chartInstance.resize();
    }
  }

  initChart(): void {
    // console.log('initializing')
    this.chartInstance = echarts.init(this.chartContainer.nativeElement);
    this.chartInstance.setOption(this.setChartOptions());
  }

  setChartOptions() {
    return this.option = {
      title: {
        text: this.title,
        left: 'center',
        top: 0
      },
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series: [{
        type: 'sankey',
        layout: 'none',
        emphasis: {
          focus: 'adjacency'
        },
        data: this.data,
        links: this.links,
        label: {
          color: '#000'
        },
        lineStyle: {
          color: 'gradient',
          curveness: 0.5
        },
        // ✅ Show values on links
        edgeLabel: {
          show: true,
          formatter: '{c}kWh', // shows link value
          fontSize: 12,
          color: '#000'
        },
      }]
    };
  }
}

