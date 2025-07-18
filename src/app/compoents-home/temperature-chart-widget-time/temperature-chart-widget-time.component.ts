import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as echarts from 'echarts';

@Component({
    standalone: true,
    selector: 'app-live-temp-chart-time',
    imports: [],
    templateUrl: './temperature-chart-widget-time.component.html',
    styleUrl: './temperature-chart-widget-time.component.css',
})
export class TemperatureChartWidgetTimeComponent {
    @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
    @Input() title: string = '';
    @Input() data: { time: number; value: number }[] = []; // ✅ object format
    @Input() latest: number = 0;
    activeTab: 'D' | 'W' | 'M' | 'Y' = 'D';

    private chart!: echarts.ECharts;
    private updateInterval: any;

    ngOnInit(): void {
        this.initChart();
        this.autoUpdateChart();
        this.getWeeklyData()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] && this.chart) {
            this.updateChartData();
        }
    }

    ngOnDestroy(): void {
        clearInterval(this.updateInterval);
        this.chart.dispose();
    }

    // Initialize chart
    private initChart(): void {
        this.chart = echarts.init(this.chartContainer.nativeElement);
        this.chart.setOption(this.getChartOption());
        window.addEventListener('resize', () => this.chart.resize());
    }

    @HostListener('window:resize')
    onResize() {
        console.log('avvnnm');
        this.chart?.resize();
    }

    // Get chart options
    // private getChartOption(): echarts.EChartsOption {
    //   return {
    //     title: {
    //       text: this.title,
    //       left: 'center',
    //       textStyle: { fontSize: 16, color: '#333' },
    //     },
    //     tooltip: {
    //       trigger: 'axis',
    //       formatter: (params: any) => {
    //         const p = params[0];
    //         const date = new Date(p.data[0]);
    //         return `${date.toLocaleTimeString()}<br/>Temp: ${p.data[1]}°C`;
    //       },
    //     },
    //     grid: { left: 30, right: 20, bottom: 40, top: 50, containLabel: true },
    //     xAxis: {
    //       type: 'time',
    //       axisLabel: { fontSize: 10 },
    //     },
    //     yAxis: {
    //       type: 'value',
    //       // name: '°C',
    //       axisLabel: { fontSize: 10 },
    //       splitLine: { show: false }, // 👈 This hides horizontal grid lines
    //     },
    //     series: [
    //       {
    //         type: 'line',
    //         data: this.formatDataForChart(),
    //         showSymbol: false,
    //         smooth: true,
    //         lineStyle: { width: 3, color: '#87CEFA' },
    //         // areaStyle: { color: 'rgba(84,112,198,0.2)' },
    //       },
    //     ],
    //     animation: false,
    //   };
    // }

    // private getChartOption(): echarts.EChartsOption {
    //     return {
    //         title: {
    //             text: this.title,
    //             left: 'center',
    //             textStyle: { fontSize: 12, color: '#333' }, // smaller font
    //         },
    //         tooltip: {
    //             trigger: 'axis',
    //             formatter: (params: any) => {
    //                 const p = params[0];
    //                 const date = new Date(p.data[0]);
    //                 return `${date.toLocaleTimeString()}<br/>Temp: ${
    //                     p.data[1]
    //                 }°C`;
    //             },
    //         },
    //         grid: {
    //             left: 30, // Adjust for label spacing
    //             right: 10,
    //             bottom: 30,
    //             top: 30,
    //             containLabel: true,
    //         },
    //         xAxis: {
    //             type: 'time',
    //             splitNumber: 3, // fewer ticks
    //             axisLabel: {
    //                 fontSize: 9,
    //             },
    //         },
    //         yAxis: {
    //             type: 'value',
    //             axisLabel: {
    //                 fontSize: 9,
    //             },
    //             splitLine: {
    //                 show: false,
    //             },
    //         },
    //         series: [
    //             {
    //                 type: 'line',
    //                 data: this.formatDataForChart().slice(-10), // 👈 only last 10 points for clarity
    //                 showSymbol: false,
    //                 smooth: true,
    //                 lineStyle: {
    //                     width: 2,
    //                     color: '#1a64b0',
    //                 },
    //             },
    //         ],
    //         animation: false,
    //     };
    // }

    private getChartOption(): echarts.EChartsOption {
        if (this.activeTab === 'D') {
            return {
                title: {
                    text: this.title,
                    left: 'center',
                    textStyle: { fontSize: 12, color: '#333' },
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: (params: any) => {
                        const p = params[0];
                        const date = new Date(p.data[0]);
                        return `${date.toLocaleTimeString()}<br/>Temp: ${
                            p.data[1]
                        }°C`;
                    },
                },
                grid: {
                    left: 30,
                    right: 10,
                    bottom: 30,
                    top: 30,
                    containLabel: true,
                },
                xAxis: {
                    type: 'time',
                    splitNumber: 3,
                    axisLabel: { fontSize: 9 },
                },
                yAxis: {
                    type: 'value',
                    axisLabel: { fontSize: 9 },
                    splitLine: { show: false },
                },
                series: [
                    {
                        type: 'line',
                        data: this.formatDataForChart().slice(-10),
                        showSymbol: false,
                        smooth: true,
                        lineStyle: { width: 2, color: '#1a64b0' },
                    },
                ],
                animation: false,
            };
        }

        switch (this.activeTab) {
            case 'W':
                    
                return {
            title: {
                text: this.title,
                left: 'center',
                textStyle: { fontSize: 12, color: '#333' },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
            },
            grid: {
                left: 30,
                right: 10,
                bottom: 30,
                top: 30,
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: this.getCategoryLabels(),
                axisLabel: { fontSize: 9 },
            },
            yAxis: {
                type: 'value',
                axisLabel: { fontSize: 9 },
                splitLine: { show: false },
            },
            series: [
                {
                    type: 'bar',
                    data: this.getBarData(),
                    itemStyle: { color: '#1a64b0' },
                },
            ],
            animation: false,
        };;
        
            case 'M':
            
                break;

            case 'Y':
                
                break;

            default:
                break;
        }

        // Bar chart for W/M/Y
        return {
            title: {
                text: this.title,
                left: 'center',
                textStyle: { fontSize: 12, color: '#333' },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
            },
            grid: {
                left: 30,
                right: 10,
                bottom: 30,
                top: 30,
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: this.getCategoryLabels(),
                axisLabel: { fontSize: 9 },
            },
            yAxis: {
                type: 'value',
                axisLabel: { fontSize: 9 },
                splitLine: { show: false },
            },
            series: [
                {
                    type: 'bar',
                    data: this.getBarData(),
                    itemStyle: { color: '#1a64b0' },
                },
            ],
            animation: false,
        };
    }

    // Convert object array to ECharts array format
    private formatDataForChart(): [number, number][] {
        return this.data.map((item) => [item.time, item.value]);
    }

    // Update chart with current data
    private updateChartData(): void {
        this.chart.setOption({
            series: [
                {
                    data: this.formatDataForChart(),
                },
            ],
        });
    }

    // Auto-scroll x-axis to show last 60s
    private autoUpdateChart(): void {
        this.updateInterval = setInterval(() => {
            const now = Date.now();

            const date = new Date(now);

            // Extract hours and minutes, and pad them with 0 if needed
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            console.log('noow', now);
            this.chart.setOption({
                xAxis: {
                    min: now - 60_000,
                    max: now,
                },
            });
        }, 2000);
    }

    switchTab(tab: 'D' | 'W' | 'M' | 'Y') {
        this.activeTab = tab;
        clearInterval(this.updateInterval); // Stop scrolling if not Daily

        if (tab === 'D') {
            this.autoUpdateChart();
        }

        this.chart.setOption(this.getChartOption(), true);
    }

    private getCategoryLabels(): string[] {
        if (this.activeTab === 'W') {
            return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        } else if (this.activeTab === 'M') {
            return Array.from({ length: 4 }, (_, i) => `Week ${i + 1}`);
        } else {
            return [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ];
        }
    }

    private getBarData(): number[] {
        if (this.activeTab === 'W') {
            // return [22, 24, 21, 23, 25, 26, 40];
            
        } 
        if (this.activeTab === 'M') {
            return [26, 28, 25, 27];
        } 
        return [15, 18, 20, 24, 29, 35, 32, 30, 28, 22, 20, 18]; // example
    }

    getWeeklyData(){

    }
}
