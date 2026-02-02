import { Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-heatmap',
    standalone: true,
    imports: [],
    templateUrl: './heatmap.component.html',
    styleUrl: './heatmap.component.css',
})
export class HeatMapComponent {
   @Input() xAxisLabels: string[] = [];
  @Input() yAxisLabels: string[] = [];
  @Input() heatmapData: number[][] = [];
  @Output() pointClicked = new EventEmitter<any>();
  @ViewChild('heatmapChart') chartRef!: ElementRef;
  chartInstance!: echarts.ECharts;
  option!: echarts.EChartsOption
  HEATMAP_COLORS_COOL_WARM = [
  '#2c7bb6', // cool blue
  '#00a6ca',
  '#00ccbc',
  '#90eb9d',
  '#ffff8c',
  '#f9d057',
  '#f29e2e',
  '#e76818',
  '#d7191c'  // hot red
];

  ngAfterViewInit(): void{
    setTimeout(() => {

      this.initChart()
    },0)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartInstance && changes['heatmapData']) {
      this.chartInstance.setOption(this.setChartOptions(), true);
    }

    

    requestAnimationFrame(() => {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    });

  }


  initChart(){
    this.chartInstance = echarts.init(this.chartRef.nativeElement);
    this.chartInstance.setOption(this.setChartOptions());

    // output event
    this.chartInstance.on('click', (params) => {
      this.pointClicked.emit(params);
    });
    // output event

  }

  setChartOptions(){
    return this.option = {
      tooltip: {
        position: 'top',
      },
      grid: {
        height: '50%',
        top: '10%',
      },
      xAxis: {
        type: 'category',
        data: this.xAxisLabels,
        splitArea: {
          show: true,
        },
      },
      yAxis: {
        type: 'category',
        data: this.yAxisLabels,
        splitArea: {
          show: true,
        },
      },
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
      series: [
        {
          name: 'Punch Card',
          type: 'heatmap',
          data: this.heatmapData,
          label: {
            show: true,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }


  @HostListener('window:resize')
  onResize(): void {
    if (this.chartInstance) {
      this.chartInstance.resize();
    }
  }

  generateDummyData(){
    const data = [];
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 5; j++) {
        data.push([i, j, Math.floor(Math.random() * 11)]);
      }
    }
    console.log('asdfzx',data)
    return data;
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  }
}

