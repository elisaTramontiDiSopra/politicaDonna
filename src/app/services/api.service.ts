import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FVG_URLS } from '../constants';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  /* getOptions() {
    let headers = new HttpHeaders();
    if (this.auth.jwtToken) {
      headers = headers.append('Authorization', `Bearer: ${this.auth.jwtToken}`);
    }
    return { headers };
  } */

  /* loadOpenData(year) {
    console.log(year);
    console.log(FVG_URLS[year]);
    return this.http.get<any>(FVG_URLS[year]);
    //return this.http.get<any>(FVG_URLS[year], this.getOptions());

  } */

  loadOpenData(url) {
    return this.http.get<any>(url);
  }

}
