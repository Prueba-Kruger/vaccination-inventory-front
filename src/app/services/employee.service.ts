import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployeesPaginated(searchValue: string, page: number, size: number) {
    return this.http.get(environment.apiUrl + '/getEmployeesPaginated?searchValue=' + searchValue + '&page=' + page + '&size=' + size);
  }
  getEmployeeById(employeeId: string) {
    return this.http.get(environment.apiUrl + '/getWorkOrderById?employeeId=' + employeeId);
  }
  deleteEmployeeById(employeeId: string) {
    return this.http.get(environment.apiUrl + '/deleteEmployeeById?employeeId=' + employeeId);
  }
  saveEmployee(employee: Employee) {
    return this.http.post(environment.apiUrl + '/saveEmployee', employee);
  }
}
