import { Injectable, ResolvedReflectiveFactory } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { GroupedObservable, Observable } from 'rxjs';
import { store } from './store';
import { map } from 'rxjs/operators';
import { ModalData } from './components/modal/modalData.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  modalDate: any;
  modalStartTime: any;
  titleOfEventInMeeting: any;
  nameOfMeetingHost: any;
  startTimeForMeeting: any;
  endTimeForMeeting: any;
  capacityForMeeting: any;
  dateForEventModal: any;
  
  
  
  getItems() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

   /* addEvent() : Observable<any>
   {
     return this.http.post('http://localhost:7000/')
   } */
  createMeeting(data: ModalData): Observable<any[]> {
    return this.http.post<any[]>('http://192.168.2.215:7000/postData', data)
  }
  getEventsStart(): Observable<any[]> {
    return this.http.get<string[]>('http://192.168.2.215:7000/data/start')
  }
}