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
  
  modalDate: String = ""
  modalStartTime: String = "";
  titleOfEventInMeeting: String = "";
  nameOfMeetingHost: String = "";
  startTimeForMeeting: String = "";
  endTimeForMeeting: String = "";
  dateForEventModal: String ="";
  capacityForMeeting: String = ""

  constructor(private http: HttpClient) { }

   /* addEvent() : Observable<any>
   {
     return this.http.post('http://localhost:7000/')
   } */
  createMeeting(data: ModalData): Observable<any[]> {
    return this.http.post<any[]>('http://localhost:7000/postData', data)
  }
  getEventsStart(): Observable<any[]> {
    return this.http.get<string[]>('http://localhost:7000/data/start')
  }
}