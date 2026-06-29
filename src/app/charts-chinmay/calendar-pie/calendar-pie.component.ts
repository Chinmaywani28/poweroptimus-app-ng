import { Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

export interface CalendarPieData {
  date: string;

  values: {
    name: string;
    value: number;
  }[];
}

@Component({
    selector: 'app-calendar-pie',
    standalone: true,
    imports: [],
    templateUrl: './calendar-pie.component.html',
    styleUrl: './calendar-pie.component.css',
})
export class CalendarPieComponent {
   @ViewChild('chartRef', { static: true })
  chartRef!: ElementRef;

  @Input() range = '2025-07';

  @Input() cellSize: number[] = [100, 100];

  @Input() pieRadius = 15;

  @Input() categories: string[] = [];

  @Input() calendarData: CalendarPieData[] = [];

  private chart!: echarts.ECharts;

  ngAfterViewInit(): void {
    this.initChart();

    window.addEventListener('resize', this.resizeChart);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      this.loadChart();
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeChart);

    this.chart?.dispose();
  }

  resizeChart = () => {
    this.chart?.resize();
  };

  initChart(): void {
    this.chart = echarts.init(this.chartRef.nativeElement);

    this.loadChart();
  }

  loadChart(): void {
    const pieSeries = this.calendarData.map((item, index) => ({
      type: 'pie',
      id: 'pie-' + index,
      center: item.date,
      radius: this.pieRadius,
      coordinateSystem: 'calendar',
      label: {
        show: false
      },
      data: item.values
    }));

    const option: any = {
      tooltip: {
        trigger: 'item'
      },

      legend: {
        bottom: 10,
        data: this.categories
      },

      calendar: {
        top: 60,
        left: 'center',
        bottom: 100,
        orient: 'vertical',

        cellSize: this.cellSize,

        range: this.range,

        yearLabel: {
          show: false
        },

        monthLabel: {
          show: false
        },

        dayLabel: {
          firstDay: 1,
          margin: 15,
          nameMap: [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
          ]
        }
      },

      series: [
        {
          id: 'date-label',

          type: 'scatter',

          coordinateSystem: 'calendar',

          symbolSize: 0,

          label: {
            show: true,

            formatter: (params: any) => {
              return echarts.time.format(
                params.value[0],
                '{dd}',
                false
              );
            },

            offset: [
              -this.cellSize[0] / 2 + 40,
              -this.cellSize[1] / 2 + 40
            ],

            fontSize: 10
          },

          data: this.calendarData.map(item => [
            item.date,
            1
          ])
        },

        ...pieSeries
      ]
    };

    this.chart.setOption(option, true);
  }
}

