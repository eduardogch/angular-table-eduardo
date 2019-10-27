import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { DataShape } from './table.models';

@Injectable()
export class TableService {

  constructor(private http: HttpClient) { }

  public getSampleData(): Observable<DataShape[]> {
    return this.http.get<DataShape[]>(`https://0f1c6e64.s3.amazonaws.com/addresses.txt`);
    // Todo Parse txt into json
    // var cells = str.split('\n').map(function (el) { return el.split(/\s+/); });
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
