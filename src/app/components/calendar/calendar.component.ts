import { Component ,OnInit} from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import daygridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi ,EventInput} from '@fullcalendar/angular';
//import { INITIAL_EVENTS, createEventId } from './event-utils';
import {  HttpClientModule } from '@angular/common/http';
import {ApiService} from 'src/app/api.service';
import { EventHandlerVars } from '@angular/compiler/src/compiler_util/expression_converter';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin,daygridPlugin,timeGridPlugin],
    weekends: false,
    
    initialView: 'timeGridWeek',
    //eventClick: this.handleEventClick.bind(this)
  }
  constructor(private apiservice : ApiService) {}
  
  ngOnInit() {
    this.apiservice.getEventsStart().subscribe((data) => {  
        this.calendarOptions = {
          headerToolbar: {
            left: 'prev,next',
            center: 'Iskraemeco',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
          selectable: true,
          //select: this.onClickOpenForm.bind(this),
          events: data
        }
    })
  }
}
