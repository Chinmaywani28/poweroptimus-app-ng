import { Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-from-left-to-right-tree-large-card',
    standalone: true,
    imports: [],
    templateUrl: './from-left-to-right-tree-large-card.component.html',
    styleUrl: './from-left-to-right-tree-large-card.component.css',
})
export class FromLeftToRightTreeLargeCardComponent {
   @ViewChild('chartContainer', { static: true })
  chartContainer!: ElementRef;

  @Input() title = '';

  @Input() treeData: any;

  @Input() collapsedEvenNodes = true;

  chartInstance!: echarts.ECharts;

  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart(): void {

    if (!this.chartContainer?.nativeElement) {
      return;
    }

    this.chartInstance = echarts.init(
      this.chartContainer.nativeElement
    );

    const chartData = structuredClone(this.treeData);

    if (
      this.collapsedEvenNodes &&
      chartData?.children?.length
    ) {
      chartData.children.forEach(
        (item: any, index: number) => {
          if (index % 2 === 0) {
            item.collapsed = true;
          }
        }
      );
    }

    const option: echarts.EChartsOption = {
      title: {
        text: this.title,
        left: 'center'
      },

      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },

      series: [
        {
          type: 'tree',

          data: [chartData],

          top: '5%',
          left: '8%',
          bottom: '5%',
          right: '20%',

          symbolSize: 8,

          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 11
          },

          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left'
            }
          },

          emphasis: {
            focus: 'descendant'
          },

          expandAndCollapse: true,

          animationDuration: 550,
          animationDurationUpdate: 750
        }
      ]
    };

    this.chartInstance.setOption(option);
  }

  @HostListener('window:resize')
  onResize() {
    this.chartInstance?.resize();
  }

  ngOnDestroy(): void {
    this.chartInstance?.dispose();
  }
}

