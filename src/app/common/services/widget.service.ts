import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  constructor(private http: HttpClient) { }

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
}
