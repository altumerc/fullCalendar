import { Component ,OnInit} from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import daygridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi ,EventInput} from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import {  HttpClientModule } from '@angular/common/http';
import {ApiService} from './api.service';
import { store } from './store';
import { EventHandlerVars } from '@angular/compiler/src/compiler_util/expression_converter';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
   dataOfModal: any =[]
  //calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin,daygridPlugin,timeGridPlugin],
    weekends: false,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'timeGridWeek',
    //eventClick: this.handleEventClick.bind(this)
  }
  constructor(private apiservice : ApiService) {}
  
  ngOnInit() {
    this.apiservice.getEventsStart().subscribe((data) => {  
        this.calendarOptions = {
          events: data,
          selectable: true,
          select: this.handleDateSelect.bind(this)
        }
    })
  }
  //   handleCalendarToggle() {
  //   this.calendarVisible = !this.calendarVisible;
  // }
  // saveEvent(){
  //   const dataForEvent ={
  //     date :this.dataForEvent.date,
  //     start : this.dataForEvent.start,
  //     end : this.dataForEvent.end
  //   }
  //   this.apiservice.addEvent(dataForEvent).
  //   subscribe((response :any) => {})
  // }

    handleWeekendsToggle() {
        const { calendarOptions } = this;
     calendarOptions.weekends = !calendarOptions.weekends;
  }

     handleDateSelect(selectInfo: DateSelectArg) {
        const title = prompt('Please enter a new title for your event');
        const calendarApi = selectInfo.view.calendar;
    //set route for the form in backend 
    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        display: 'background'
        //allDay: selectInfo.allDay
      })
    }
    const {start, end} = this.dataOfModal
    // this.apiservice.addEvent().subscribe((data) =>{

    // })
   // console.log(selectInfo.startStr)
    console.log(this.dataOfModal)
  }
}

//   handleEventClick(clickInfo: EventClickArg) {
//     if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//       clickInfo.event.remove();
//     }
//   }


// function clickInfo(clickInfo: any, EventClickArg: any) {
//   throw new Error('Function not implemented.');
// }

// function handleEventClick(clickInfo: (clickInfo: any, EventClickArg: any) => void, EventClickArg: any) {
//   throw new Error('Function not implemented.');
// }
  // handleEvents(events: EventApi[]) {
  //   this.currentEvents = events;
  // }
