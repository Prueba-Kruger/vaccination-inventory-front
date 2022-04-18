import { async, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { UserService } from './user.service';

describe('UserService', () => {

  beforeEach(() => TestBed.configureTestingModule({}));



  it('should doLoginRest', async(() => {
    const httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    httpClient.get.and.returnValue(new Observable(observer => {
      observer.next('ok');
    }));
    const userService = new UserService(httpClient);
    userService.doLoginRest('test', '1').subscribe(res => {
      expect(res).toBe('ok');

    });
  }));
});
