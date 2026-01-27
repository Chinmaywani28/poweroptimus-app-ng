import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TemperatureChartWidgetComponent } from '../compoents-home/temperature-chart-widget/temperature-chart-widget.component';
import { TemperatureChartWidgetTimeComponent } from "../compoents-home/temperature-chart-widget-time/temperature-chart-widget-time.component";
import { Subscription } from 'rxjs';
import { WidgetService } from '../common/services/widget.service';
import * as echarts from 'echarts';
import { TemperatureChartWidgetTimeTwoComponent } from "../compoents-home/temperature-chart-widget-time-two/temperature-chart-widget-time.component-two";
import { LiveChartComponent } from "../compoents-home/live-chart/live-chart.component";
import { BasicBarComponent } from "../charts-chinmay/basic-bar/basic-bar.component";
import { HeatMapComponent } from '../charts-chinmay/heatmap/heatmap.component';
import { StageSpeedGuageComponent } from "../charts-chinmay/stage-speed-guage/stage-speed-guage.component";

@Component({
    selector: 'app-home-default',
    standalone: true,
    imports: [
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    TemperatureChartWidgetComponent,
    TemperatureChartWidgetTimeComponent,
    TemperatureChartWidgetTimeTwoComponent,
    LiveChartComponent,
    BasicBarComponent,
    HeatMapComponent,
    StageSpeedGuageComponent
],
    templateUrl: './home-default.component.html',
    styleUrl: './home-default.component.scss',
})
export class HomeDefaultComponent {
    @ViewChild('chartContainer')
    chartContainer!: ElementRef;

    chartInstance!: echarts.ECharts;
    sub!: Subscription;
    chartData: any;
    data: any;
    //barchart
    barXData: any
    barYData: any
    weeklyBarXData: any
    weeklyBarYData: any

    // heatmap code
    heatmapValues: any
    private intervalId: any;
    xLabels: any = [];
    yLabels: any = [];

    // Stage Speed Guage chart
    StageSpeedGuagedata = []

    // graphConfigs
    graphConfig: any 

    constructor(private floorService: WidgetService) {}

    ngOnInit() {
        // setInterval(() => {
        //     this.floorService.getContinousData().subscribe((resp: any) => {
        //         this.data = resp
        //     })
        // }, 2000); // 2 seconds

        // this.floorService.getContinousData().subscribe((resp: any) => {
        //     // this.data = resp
        //     console.log('ffor', resp);
        //     this.data =  this.transformLiveData(resp)
        // });

        // hourly bar chart
        this.floorService.getHourlyBarData().subscribe((resp: any)=> {
            console.log('reeess::',resp)
            this.barXData = resp.xAxis
            this.barYData = resp.series
            
        })
        // weekly bar chart
        this.floorService.getWeeklyBarData().subscribe((resp: any)=> {
            console.log('reeess::',resp)
            this.weeklyBarXData = resp.xAxis
            this.weeklyBarYData = resp.series
            
        })

        // random data heatmap
        // this.generateRandomData();
        // this.intervalId = setInterval(() => {
        //     this.generateRandomData();
        // }, 2000);
        
        this.floorService.getHeatMapData().subscribe((resp: any) => {
            this.heatmapValues = resp.heatmapValues;
            this.xLabels = resp.xLabels;
            this.yLabels = resp.yLabels

            // this.heatmapValues = [
            //     [0, 0, 5], // 9 AM
            //     [0, 1, 8], // 10 AM
            //     [0, 2, 12], // 11 AM
            //     [0, 3, 20], // 12 PM
            //     [0, 4, 32], // 1 PM
            //     [0, 5, 38], // 2 PM (peak)
            //     [0, 6, 25], // 3 PM
            //     [0, 7, 15], // 4 PM
            //     [0, 8, 8], // 5 PM
            //     [0, 9, 4], // 6 PM
            // ];
            // this.xLabels = ['Jan19'];
            // this.yLabels = [
            //     '9:00',
            //     '10:00',
            //     '11:00',
            //     '12:00',
            //     '13:00',
            //     '14:00',
            //     '15:00',
            //     '16:00',
            //     '17:00',
            //     '18:00',
            // ];
        })

        // energy spot value
        // setInterval(() => {
        //     this.floorService.getEnergyLoad().subscribe((resp: any) => {
        //         // console.log('ajhiyink',resp)
        //     this.StageSpeedGuagedata = resp
        // }) 
        // }, 1000);
        
        // getGraphConfigs
        this.floorService.selectedFloor$.subscribe((floor: any) => {
            // console.log('knnln',floor)
            if(floor){
                this.floorService.getGraphConfig(floor).subscribe((resp: any) => {
                        console.log('afnvnvkn', resp)
                       if(resp.result.length){
                            this.graphConfig = resp.result
                            console.log('this.graphConfig',this.graphConfig)
                            // fetchCharts Data
                            this.fetchCharts()
                       }     
                })
            }
        })

        


    }

    ngAfterViewInit() {
        this.chartInstance = echarts.init(this.chartContainer.nativeElement);

        // this.sub = this.floorService.selectedFloor$.subscribe((floor) => {
        //     if (floor) {
        //         this.loadChart(floor);
        //     }
        // });
    }

    loadChart(floorId: string) {
        this.floorService.getNewData().subscribe((data: any) => {
            console.log('floor:', data);

            this.chartData = data;
            console.log('Chart updated for floor:', this.chartData);

            const option: echarts.EChartsOption = {
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: {
                    type: 'category',
                    // data: this.chartData.data.timestamp.map((t: string, i: number) => `${t} (${i})`)
                    data: this.chartData.data.timestamp,

                    // data: ["mond","tues"]
                },
                yAxis: {
                    type: 'value',
                    scale: true,
                },
                series: [
                    {
                        data: this.chartData.data.meter_reading,
                        // data: [10,20],
                        type: 'line',
                        smooth: true,
                    },
                ],
            };

            if (!this.chartInstance || this.chartInstance.isDisposed()) {
                console.warn('Chart not ready yet');
                return;
            }

            this.chartInstance.setOption(option, true);
        });
    }

    // data = [
    //     { time: Date.now() - 40000, value: 21.2 },
    //     { time: Date.now() - 30000, value: 21.8 },
    //     { time: Date.now() - 20000, value: 22.1 },
    //     { time: Date.now() - 10000, value: 22.6 },
    //     { time: Date.now(), value: 23.0 },
    // ];

    // data = [
    //     { time: 1768196594718, value: 21.13 },
    //     { time: 1768196594718, value: 21.85 },
    //     { time: 1768196594718, value: 22.5 },
    //     { time: 1768196594718, value: 22.79 },
    //     { time: 1768196594718, value: 21.86 },
    // ];

    transformLiveData(
        rawData: { time: number; value: number }[],
        gapMs = 10_000 // 10 seconds gap
    ): { time: number; value: number }[] {
        const baseTime = Date.now();

        const abc =  rawData.map((item, index) => ({
            time: baseTime - (rawData.length - 1 - index) * gapMs,
            value: item.value,
        }));
        console.log('aaava::',abc)
        return abc
    }

    

    // heatmap interval data loading fun
    // generateRandomData() {
    //     const data: number[][] = [];
    //     for (let i = 0; i < this.xLabels.length; i++) {
    //     for (let j = 0; j < this.yLabels.length; j++) {
    //         data.push([i, j, Math.floor(Math.random() * 11)]);
    //     }
    //     }
    //     console.log('daatta',data)
    //     this.heatmapValues = data;
    // }


    fetchCharts(){
        this.graphConfig.map(async (item: any) => {
          try {
            const meterConfig = this.renderChart(item);

            console.log('mcncn',meterConfig)
            let obj = {
              meterConfig,
              chart_type: item.chart_type,
              graph_id: item.graph_id,
              meter_name: item.meter_name_jp || 'componentMap',
            };

            let data;
            switch (item.gadget_type) {
              case "temperature":
              case "current":
              case "humidity":
              case "pressure":
              case "co":
              case "co2":
              case "lux":

              

              case "alarm":
              case "valve":
              case "heat":
              case "flow":
              case "sensor":
              case "vibration":
              case "particle":
              case "noise":
              case "discomfort":
              case "no2":  
            //   case "gas":
            //     data = await fetchTemperatureData(
            //       item.time_period,
            //       meterConfig
            //     );
            //     break;
            //   case "energy":
            //     data = await fetchEnergyData(item.time_period, meterConfig);
            //     break;
            //   case "power":
            //     data = await fetchPowerData(item.time_period, meterConfig);
            //     break;
            //   case "combinePower":
            //     data = await fetchCombineData(item.time_period);
            //     obj.meterConfig = { gadget: "Power", meter_name: componentMap };
            //     break;
            //   case "combineEnergy":
            //     data = await fetchCombineDataEnergy(item.time_period);
            //     obj.meterConfig = { gadget: "Energy", meter_name: componentMap };
            //     break;
              default:
                console.warn(`Unknown gadget_type: ${item.gadget_type}`);
                return null;
            }

            return { ...obj, energy_data: data };
          } catch (error) {
            // setError(error.message || "Error fetching data");
            return null;
          }
        })
    }

    renderChart(meter: any){
        switch (meter.gadget_type) {
      case "alltypes":

      case "lux":
        return {
          dbTable: meter.name_of_table,
          lux: meter.lux_l,
          parameter: meter.lux_l,
          range: meter.time_period,
          gadget: meter.gadget_type,
        };

    //   case "energy":
    //     return {
    //       dbTable: meter.name_of_table,
    //       energy: meter.energy_watt_hr,
    //       chart_type: meter.chart_type,
    //       range: meter.time_period,
    //       gadget: meter.gadget_type,
    //       views: meter.name_of_table + "_energy",
    //     };
    //   case "temperature":
    //     return {
    //       dbTable: meter.name_of_table,
    //       temperature: meter.temperature_c,
    //       parameter: meter.temperature_c,
    //       range: meter.time_period,
    //       gadget: meter.gadget_type,
    //       views: meter.name_of_table + "_temp",
    //     };
    //   case "power":
    //     return {
    //       dbTable: meter.name_of_table,
    //       power: meter.power_watt,
    //       parameter: meter.power_watt,
    //       chart_type: meter.chart_type,
    //       range: meter.time_period,
    //       gadget: meter.gadget_type,
    //       views: meter.name_of_table + "_power",
    //     };

    //   case "humidity":
    //     return {
    //       dbTable: meter.name_of_table,
    //       humidity: meter.humidity_g_m3,
    //       parameter: meter.humidity_g_m3,
    //       range: meter.time_period,
    //       gadget: meter.gadget_type,
    //       views: meter.name_of_table + "_hum",
    //     };

    //   case "pressure":
    //     return {
    //       dbTable: meter.name_of_table,
    //       pressure: meter.pressure_p,
    //       parameter: meter.pressure_p,
    //       range: meter.time_period,
    //       gadget: meter.gadget_type,
    //     };

    //   case "co":
    //     return {
    //       dbTable: meter.name_of_table,
    //       co: meter.co_p,
    //       parameter: meter.co,
    //       range: meter.time_period,
    //       gadget: meter.gadget_type
    //     };

    //   case "co2":
    //     return {
    //       dbTable: meter.name_of_table,
    //       co: meter.co2_p,
    //       parameter: meter.co2_p,
    //       range: meter.time_period,
    //       gadget: meter.gadget_type,
    //     };

      

    //   case "noise":
    //     return {
    //       dbTable: meter.name_of_table,
    //       aud: meter.aud_db,
    //       parameter: meter.aud_db,
    //       range: meter.time_period,
    //       gadget: meter.gadget_type,
    //     };

    //   case "vibration":
    //     return {
    //       dbTable: meter.name_of_table,
    //       vib: meter.vib_mm_s,
    //       parameter: meter.vib_mm_s,
    //       range: meter.time_period,
    //       gadget: meter.gadget_type,
    //     };

    //   case "valve":
    //     return {
    //       dbTable: meter.name_of_table,
    //       valve: meter.valve_position,
    //       parameter: meter.valve_position,
    //       range: meter.time_period,
    //       gadget: meter.gadget_type,
    //     };

    //   case "check":
    //     return {
    //       dbTable: meter.name_of_table,
    //       check: meter.check,
    //       parameter: meter.check,
    //       range: meter.time_period,
    //       gadget: meter.gadget_type,
    //     };

    //   case "particle":
    //     return {
    //       dbTable: meter.name_of_table,
    //       particle: meter.particle,
    //       parameter: meter.particle,
    //       range: meter.time_period,
    //       gadget: meter.gadget_type,
    //     };

    //   case "current":
    //     return {
    //       dbTable: meter.name_of_table,
    //       current: meter.current_a,
    //       parameter: meter.current_a,
    //       range: meter.time_period,
    //       gadget: meter.gadget_type,
    //     };

    //   case "flow":
    //     return {
    //       dbTable: meter.name_of_table,
    //       flow: meter.flow_control,
    //       parameter: meter.flow_control,
    //       range: meter.time_period,
    //       gadget: meter.gadget_type,
    //     };

    //   case "sensor":
    //     return {
    //       dbTable: meter.name_of_table,
    //       sensor: meter.sensor_status,
    //       parameter: meter.sensor_status,
    //       range: meter.time_period,
    //       gadget: meter.gadget_type,
    //     };

    //   case "alarm":
    //     return {
    //       dbTable: meter.name_of_table,
    //       alarm: meter.alarm_status,
    //       parameter: meter.alarm_status,
    //       range: meter.time_period,
    //       gadget: meter.gadget_type,
    //     };

    //   case "heat":
    //     return {
    //       dbTable: meter.name_of_table,
    //       heat: meter.heat_joules,
    //       parameter: meter.heat_joules,
    //       range: meter.time_period,
    //       gadget: meter.gadget_type,
    //     };

    //   case "discomfort":
    //     return {
    //       dbTable: meter.name_of_table,
    //       discomfort: meter.discomfort_index,
    //       parameter: meter.discomfort_index,
    //       range: meter.time_period,
    //       gadget: meter.gadget_type,
    //     };

    //    case "no2":
    //     return {
    //       dbTable: meter.name_of_table,
    //       no2: meter.no2_p,
    //       parameter: meter.no2_p,
    //       range: meter.time_period,
    //       gadget: meter.gadget_type,
    //     };
        
    //      case "gas":
    //     return {
    //       dbTable: meter.name_of_table,
    //       gas: meter.gas_detector,
    //       parameter: meter.gas_detector,
    //       range: meter.time_period,
    //       gadget: meter.gadget_type,
    //     };

      default:
        return {};
    }
    }

    
}

