import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  SimpleChanges
} from '@angular/core';

import * as echarts from 'echarts';

@Component({
  selector: 'basic-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css',
})
export class BasicLineChartComponent {

  @ViewChild('chartContainer')
  chartContainer!: ElementRef;

  // X axis labels
  @Input() xAxisData: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  // Y axis values
  @Input() seriesData: number[] = [120, 200, 150, 80, 70];

  private chartInstance!: echarts.ECharts;

  ngAfterViewInit() {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chartInstance) {
      this.setChartOption();
    }
  }

  // Create chart
  private initChart() {

    // Initialize echarts
    this.chartInstance = echarts.init(
      this.chartContainer.nativeElement
    );

    // Set chart data
    this.setChartOption();

    // Responsive resize
    window.addEventListener('resize', () => {
      this.chartInstance.resize();
    });
  }

  // Chart configuration
  private setChartOption() {

    const option: echarts.EChartsOption = {

      tooltip: {
        trigger: 'axis'
      },

      xAxis: {
        type: 'category',
        data: this.xAxisData
      },

      yAxis: {
        type: 'value'
      },

      series: [
        {
          type: 'line',
          data: this.seriesData
        }
      ]
    };

    // Apply option
    this.chartInstance.setOption(option);
  }
}