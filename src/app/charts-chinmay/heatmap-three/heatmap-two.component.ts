import { Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-heatmap-three',
    standalone: true,
    imports: [],
    templateUrl: './heatmap-two.component.html',
    styleUrl: './heatmap-two.component.css',
})
export class HeatMapThreeComponent {
  //  @Input() visible = false;
  // @Input() xAxisLabels: string[] = [];
  // @Input() yAxisLabels: string[] = [];
  // @Input() heatmapData: number[][] = [];
  // @Input() xName: any = [];
  // @Input() yName: any = [];

  @Input() visible = false;

// ✅ X Axis (Hours)
@Input() xAxisLabels: string[] = [
  '00',
  '02',
  '04',
  '06',
  '08',
  '10',
  '12',
  '14',
  '16',
  '18',
  '20',
  '22'
];

// ✅ Y Axis (Buildings / Floors)
@Input() yAxisLabels: string[] = [
  'Building A',
  'Building B',
  'Building C',
  'Building D'
];

// ✅ Axis Names
@Input() xName: any = 'Hours';
@Input() yName: any = 'Buildings';

// ✅ Heatmap Data
// Format:
// [xIndex, yIndex, value]

@Input() heatmapData: number[][] = [

  // ======================
  // Building A
  // ======================

  [0, 0, 120],
  [1, 0, 140],
  [2, 0, 180],
  [3, 0, 220],
  [4, 0, 280],
  [5, 0, 350],
  [6, 0, 420],
  [7, 0, 460],
  [8, 0, 500],
  [9, 0, 420],
  [10, 0, 300],
  [11, 0, 220],

  // ======================
  // Building B
  // ======================

  [0, 1, 100],
  [1, 1, 120],
  [2, 1, 160],
  [3, 1, 210],
  [4, 1, 260],
  [5, 1, 320],
  [6, 1, 380],
  [7, 1, 430],
  [8, 1, 470],
  [9, 1, 390],
  [10, 1, 280],
  [11, 1, 200],

  // ======================
  // Building C
  // ======================

  [0, 2, 90],
  [1, 2, 110],
  [2, 2, 150],
  [3, 2, 190],
  [4, 2, 240],
  [5, 2, 310],
  [6, 2, 360],
  [7, 2, 410],
  [8, 2, 450],
  [9, 2, 370],
  [10, 2, 260],
  [11, 2, 180],

  // ======================
  // Building D
  // ======================

  [0, 3, 80],
  [1, 3, 100],
  [2, 3, 130],
  [3, 3, 170],
  [4, 3, 220],
  [5, 3, 290],
  [6, 3, 340],
  [7, 3, 390],
  [8, 3, 430],
  [9, 3, 350],
  [10, 3, 240],
  [11, 3, 160],
];


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
      grid: {
        top: 50,
        left: 50,
        right: 50,
        bottom: 50,
        // containLabel: true // ✅ prevents label cut
      },
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
      //      pieces: [
      //   { min: 25, max: 34, color: '#e8f0fe' }, // very low (super light)
      //   { min: 35, max: 44, color: '#d2e3fc' }, // low
      //   { min: 45, max: 54, color: '#aecbfa' }, // medium
      //   { min: 55, max: 64, color: '#8ab4f8' }, // high
      //   { min: 65, max: 80, color: '#669df6' }  // very high (still light, not dark)
      // ]
      pieces: [
  { min: 25, max: 34, color: '#ff7875' }, // soft red
  { min: 35, max: 44, color: '#ff9c6e' }, // orange
  { min: 45, max: 54, color: '#ffd666' }, // yellow
  { min: 55, max: 64, color: '#b7eb8f' }, // light green
  { min: 65, max: 80, color: '#73d13d' }  // green
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

