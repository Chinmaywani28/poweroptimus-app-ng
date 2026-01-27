import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  constructor(private http: HttpClient) { }

  private selectedFloorSubject = new BehaviorSubject<any>(null);
  selectedFloor$ = this.selectedFloorSubject.asObservable();




  // Called from Sidebar
  selectFloor(floor: any) {
    console.log('fasdfkv', floor)
    this.selectedFloorSubject.next(floor);

    // this.getGraphConfig(floor).subscribe((resp: any) => {
    //     console.log('geafds',resp)

    // });


    // statically done

    // return 


  }

  getWeeklyData(){
    return this.http.get(``).pipe(map((item: any) => {


    }))
  }

  getMonthlyData(month: string){
    return this.http.get(`/${month}`,).pipe(map((item: any) => {


    }))
  }

  getYearlyData(yearly: string){
    return this.http.get(`/${yearly}`,).pipe(map((item: any) => {


    }))
  }

  // getNewData(){

  //   let obj = {
  //       headers: {
  //         Authorization: 'token',
  //       },
  //       params: {
  //         1,
  //         'Staircase_Illumination sensor', //componentMap
  //         "floorKey"
  //       },
  //     }

  //   return this.http.get(`http://localhost:3010/graphservice/getCompleteGraphConfig`,obj).pipe(map((item: any) => {
  //     return item
  //   }))
  // }

  getNewData(){

  //   const params = {
  //   range: 'day',
  //   meterConfig: JSON.stringify({
  //     dbTable: 'admin_block_lt_panel',
  //     energy: 'u59',
  //     chart_type: 'intermidiateEnergy',
  //     range: 'day',
  //     gadget: 'energy',
  //     views: 'admin_block_lt_panel_energy'
  //   })
  // };

 let params = new HttpParams()
      .set('range', 'live')
      .set('meterConfig[dbTable]', 'admin_block_lt_panel')
      .set('meterConfig[power]', 'u1')
      .set('meterConfig[parameter]', 'u1')
      .set('meterConfig[chart_type]', 'intermidiatePower')
      .set('meterConfig[range]', 'live')
      .set('meterConfig[gadget]', 'power')
      .set('meterConfig[views]', 'admin_lift_panel_power');


    // return this.http.get(`http://10.197.196.21:3010/graphDataservice/getDeviceInfoIndivisualDeviceCurrent/`, {params}).pipe(map((item: any) => {
    //   return item
    // }))

    return this.http.get(`http://localhost:3010/graphDataservice/getDeviceInfoIndivisualDeviceCurrent/`, {params}).pipe(map((item: any) => {
      return item
    }))
  }

  // getContinousData(){
  //   return this.http.get(`http://localhost:3010/sensorLiveData`).pipe(map((resp: any) => {
  //       console.log('data:;',resp)
  //       return resp
  //   }))
  // }

  getHourlyBarData(){
    return this.http.get(`http://localhost:3010/api/sensors/hourly`).pipe(map((resp: any) => {
        // let obj = {
        //   xdataArr: [],
        //   series: []
        // }
        // obj.xdataArr = item.xAxis.map(((items: any) => {
        //   return items.xAxis
        // }));
        
        // obj.series = item.series.map(((items: any) => {
        //   return items.series
        // }));
        // console.log('asvnvnv::',obj)
        return resp
    }))

  }

  getWeeklyBarData(){
    return this.http.get(`http://localhost:3010/api/sensors/daily`).pipe(map((resp: any) => {
        // let obj = {
        //   xdataArr: [],
        //   series: []
        // }
        // obj.xdataArr = item.xAxis.map(((items: any) => {
        //   return items.xAxis
        // }));
        
        // obj.series = item.series.map(((items: any) => {
        //   return items.series
        // }));
        // console.log('asvnvnv::',obj)
        return resp
    }))

  }

  getHeatMapData(){
    return this.http.get(`http://localhost:3010/api/sensors/hourly-single-day-heatmap`).pipe(map((resp: any) => {
        
        return resp
    }))
  }

  getEnergyLoad(){
    return this.http.get(`http://localhost:3010/energySpotValue`).pipe(map((resp: any) => {
        
        return resp
    }))
  }

  getGraphConfig(paramsObj :any){
      let temp =  {
        userId: 1,
        componentMap: paramsObj.componentMap,
        floorKey: paramsObj.floorKey
      }

        let params = new HttpParams()
      .set('userId', 1)
      .set('componentMap', temp.componentMap)
      .set('floorKey', temp.floorKey)

      return this.http.get(`http://localhost:3010/graphservice/getCompleteGraphConfig/`, {params}).pipe(map((item: any) => {
      
      return item
    }))
  }

  //new api fetches of energy
  fetchWeeklyEnergy(){

     let params = new HttpParams()
      .set('range', '7d')
      .set('meterConfig[dbTable]', 'lux_67ac89061a1')
      .set('meterConfig[parameter]', 'u1')
      .set('meterConfig[chart_type]', 'intermidiateLux')
      .set('meterConfig[gadget]', 'lux')
      .set('userId', '1')

      

    return this.http.get(`http://localhost:3010/graphDataservice/fetchChartData`,{params}).pipe(map((resp: any) => {
        
    })) 
  }
}
