import { Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-heatmap-two',
    standalone: true,
    imports: [],
    templateUrl: './heatmap-two.component.html',
    styleUrl: './heatmap-two.component.css',
})
export class HeatMapTwoComponent {
   @Input() visible = false;
  @Input() xAxisLabels: string[] = [];
  @Input() yAxisLabels: string[] = [];
  @Input() heatmapData: number[][] = [];
  @Input() xName: any = [];
  @Input() yName: any = [];


  @ViewChild('heatmapChart') chartRef!: ElementRef;

  chartInstance?: echarts.ECharts;

  ngOnChanges(changes: SimpleChanges): void {

    // init ONLY when parent says visible
    if (changes['visible'] && this.visible) {
      requestAnimationFrame(() => this.initChart());
    }

    // update data safely
    if (changes['heatmapData'] && this.chartInstance) {
      this.chartInstance.setOption(this.getOptions(), true);
      this.chartInstance.resize();
    }
  }

  initChart() {
    if (!this.chartRef?.nativeElement) return;

    if (this.chartInstance) {
      this.chartInstance.dispose();
    }

    this.chartInstance = echarts.init(this.chartRef.nativeElement);
    this.chartInstance.setOption(this.getOptions());
  }

  getOptions(): echarts.EChartsOption {
    return {
      tooltip: { position: 'top' },
      xAxis: { type: 'category', data: this.xAxisLabels, name: this.xName,nameLocation: 'middle',nameGap: 30,    },
      yAxis: { type: 'category', data: this.yAxisLabels, name: this.yName},
      series: [{
        type: 'heatmap',
        data: this.heatmapData,
        label: { show: true }
      }],
       visualMap: {
        show: false,
        min: 0,
        max: 10,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%',
        type: 'piecewise',   // 👈 IMPORTANT
        dimension: 2,        // 👈 THIS IS THE KEY FIX
        //   inRange: {
        //   color: this.HEATMAP_COLORS_COOL_WARM
        // }
           pieces: [
        { min: 25, max: 34, color: '#e8f0fe' }, // very low (super light)
        { min: 35, max: 44, color: '#d2e3fc' }, // low
        { min: 45, max: 54, color: '#aecbfa' }, // medium
        { min: 55, max: 64, color: '#8ab4f8' }, // high
        { min: 65, max: 80, color: '#669df6' }  // very high (still light, not dark)
      ]

      },
    };
  }

  @HostListener('window:resize')
  onResize() {
    this.chartInstance?.resize();
  }

  ngOnDestroy() {
    this.chartInstance?.dispose();
  }
}

