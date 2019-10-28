import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { DataShape } from './table.models';

@Injectable()
export class TableService {

  constructor(private http: HttpClient) { }

  public getSampleData(): Observable<DataShape[]> {
    return this.http.get<DataShape[]>(`${environment.host}/assets/addresses.txt`, 
      { responseType: 'text' }).pipe(data => {
      const response = data.split(/\r?\n/).map((el, index) => { 
        let columns = el.split(/\s+/);
        return {
          name: columns[1],
          address_1: columns[2],
          city: columns[3],
          zip: columns[4],
          id: index,
          date_recent: 'Recent Date'
        }
      });
      return response;
    })
  }

  public submitSampleRow(data: DataShape): Promise<DataShape> {
    return this.http.post(`${environment.host}/api/sample/route`, data)
      .toPromise()
      .catch(error => {
        console.warn('Post call failed as expected, because route does not exist. Submitted row:', data);
        return data;
      });
  }
}
