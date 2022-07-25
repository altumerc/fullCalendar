import { Component, OnInit, ElementRef, ViewChild, Output, Input } from '@angular/core';
import { Calendar } from '@fullcalendar/angular';
import { FullCalendarModule } from '@fullcalendar/angular';
import daygridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'src/app/api.service';
import { EventHandlerVars } from '@angular/compiler/src/compiler_util/expression_converter';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { EventData } from '../calendar/eventData.model'
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  modalDate: String = ""
  modalStartTime: String = "";
  titleOfEventInMeeting: String = "";
  nameOfMeetingHost: String = "";
  startTimeForMeeting: String = "";
  endTimeForMeeting: String = "";
  calendarVisible = true;
  eventData: EventData[]

  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, daygridPlugin, timeGridPlugin],
    weekends: false,
    initialView: 'timeGridWeek',
  }

  constructor(public apiservice: ApiService) { }

  @ViewChild('divClick') divClick: ElementRef;

  @ViewChild('calendarModal') calendarModal: ElementRef;

  ngOnInit() {
    this.apiservice.getEventsStart().subscribe((data) => {
      this.calendarOptions = {
        initialView: 'timeGridWeek',
        weekends: false,
        slotDuration: "00:15:00",
        slotMinTime: "09:00:00",
        slotMaxTime: "21:00:00",
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'timeGridWeek,timeGridDay'
        },
        //editable:true,
        selectable: true,
        events: data,
        eventColor: 'pink',

        dateClick: this.handleDateClick.bind(this),
        eventClick: this.handleEventClick.bind(this)
      }
    })
  }

  handleDateClick(info) {
    var dateForCalendarInModal = info.dateStr.slice(0, 10).toString()
    //console.log(dateForCalendarInModal)
    this.apiservice.modalDate = dateForCalendarInModal
    console.log(this.apiservice.modalDate)
    var timeForCalendarInModal = info.dateStr.slice(11, 19).toString()
    const timeForCalendarInModal12hr = new Date('1970-01-01T' + timeForCalendarInModal + 'Z')
      .toLocaleTimeString('en-UK',
        { timeZone: 'UTC', hour12: false, hour: 'numeric', minute: 'numeric' }
      );
      console.log(timeForCalendarInModal12hr)
    this.apiservice.modalStartTime = timeForCalendarInModal12hr
    document.getElementById('divClick').click();
  }

  handleEventClick(info) {
    var titleOfEvent = info.event.title
    this.apiservice.titleOfEventInMeeting = titleOfEvent
    var name = info.event.classNames
    this.apiservice.nameOfMeetingHost = name
    this.apiservice.startTimeForMeeting = info.event.start.toLocaleTimeString()
    this.apiservice.endTimeForMeeting = info.event.end.toLocaleTimeString()
    document.getElementById('calendarModal').click()
    // this.apiservice.getDataForModal().subscribe(response => {
    //   var name = info.event.classNames
    //   //var cap = info.event.classNames
    //   //var names = response.map(n => n.name)
    //   //var capacity = response.map(cap => cap.c)

    //   this.eventData = response
    // })
  }
}