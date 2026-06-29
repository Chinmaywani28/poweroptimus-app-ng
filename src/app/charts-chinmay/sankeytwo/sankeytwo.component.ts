import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import * as echarts from 'echarts/core';

@Component({
  selector: 'app-sankeytwo',
  templateUrl: './sankeytwo.component.html',
  styleUrl: './sankeytwo.component.css'
})
export class SankeytwoComponent {

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef<HTMLDivElement>;
  @Input() title: string = 'Dynamic Sankey Chart';
  @Input() data: { name: string }[] = [

    
  ];
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
