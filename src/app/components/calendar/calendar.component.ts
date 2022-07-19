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
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    modalDate : String = ""
    modalStartTime: String = "";

  calendarVisible = true;

  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, daygridPlugin, timeGridPlugin],
    weekends: false,
    initialView: 'timeGridWeek',
  }

  constructor(private apiservice: ApiService) { }

  @ViewChild('divClick') divClick: ElementRef;
  
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
        dateClick: this.handleDateClick.bind(this)
      }
    })
  }
  
  handleDateClick(info){
          var dateForCalendarInModal = info.dateStr.slice(0, 10).toString()
          //console.log(dateForCalendarInModal)
          this.apiservice.modalDate = dateForCalendarInModal 
          console.log(this.modalDate) 
          var timeForCalendarInModal= info.dateStr.slice(11, 19).toString()
          this.apiservice.modalStartTime = timeForCalendarInModal
          document.getElementById('divClick').click();
  }
}