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
  @ViewChild('heatmapChart', { static: true }) chartRef!: ElementRef;
  chartInstance!: echarts.ECharts;
  option!: echarts.EChartsOption

  ngAfterViewInit(): void{
    this.initChart()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartInstance && changes['heatmapData']) {
      this.chartInstance.setOption(this.setChartOptions(), true);
    }
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
        min: 0,
        max: 10,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%',
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

