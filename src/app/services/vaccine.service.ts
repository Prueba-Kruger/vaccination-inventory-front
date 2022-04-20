import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  constructor(private http: HttpClient) { }

  getVaccines() {
    return this.http.get(environment.apiUrl + '/getVaccines');
  }

}
