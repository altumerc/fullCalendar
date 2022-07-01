import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {store} from './store';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor(private http:HttpClient){}

getEventsStart():Observable<any[]> {
  return this.http.get<string[]>('http://localhost:7000/data/start')

}
// getEventsEnd() :Observable<store[]>{
//   return this.http.get<store[]>('http://localhost:7000/data/end')
// }
}
