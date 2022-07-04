import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {store} from './store';
import { map } from 'rxjs/operators';
import { ModalData } from './components/modal/modalData.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor(private http:HttpClient){}

// addEvent() : Observable<any>
// {
//   return this.http.post('http://localhost:7000/')
// }
createMeeting(data : any) : Observable<any[]>
{
  return this.http.post<any>('http://localhost:7000/postData', data)
}
getEventsStart():Observable<any[]> {
  return this.http.get<string[]>('http://localhost:7000/data/start')
}
}
