import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';




@Injectable({
  providedIn: 'root'
})
export class EosService {
  public eos: any;

  constructor(private http: HttpClient) {
    //  this.eos = Eos.ApiInterfa({
    //    httpEndpoint: environment.blockchainUrl
    //  })
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getInfo(): Observable<any>{
    return this.http.get( environment.blockchainbaseUrl + 'get_info')
      .pipe(
        map(data =>data),
        retry(2)

      );
  }
  

  getBlock(blockid): Observable<any>{
    return this.http.post(environment.blockchainbaseUrl + 'get_block',{"block_num_or_id": blockid})
    .pipe(
      map(data=>data)
    )
  }

}