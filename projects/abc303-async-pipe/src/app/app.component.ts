import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import {
  Employee,
  EmployeeLoaderService
} from './employee-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  employeeData: Observable<Employee[]>;

  constructor(svc: EmployeeLoaderService) {
    this.employeeData = svc.loadEmployees();
  }
}
