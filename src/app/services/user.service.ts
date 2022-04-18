import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  doLoginRest(userName: string, password: string) {
    return this.http.get(environment.apiUrl + '/loginUser?username=' + userName + '&password=' + password);
  }
}
