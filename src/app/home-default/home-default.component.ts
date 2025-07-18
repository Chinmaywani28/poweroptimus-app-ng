import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TemperatureChartWidgetComponent } from '../compoents-home/temperature-chart-widget/temperature-chart-widget.component';
import { TemperatureChartWidgetTimeComponent } from "../compoents-home/temperature-chart-widget-time/temperature-chart-widget-time.component";


@Component({
    selector: 'app-home-default',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, MatTableModule, MatPaginatorModule, TemperatureChartWidgetComponent, TemperatureChartWidgetTimeComponent],
    templateUrl: './home-default.component.html',
    styleUrl: './home-default.component.scss'
})
export class HomeDefaultComponent {

    
    

}

