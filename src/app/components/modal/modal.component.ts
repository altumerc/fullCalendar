import { Component, OnInit, ViewChild ,AfterViewInit, Input} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/angular';
import { ModalData } from './modalData.model'
import { ApiService } from 'src/app/api.service'
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit,AfterViewInit {

  formValue !: FormGroup
  newEndTime: String = ""
  dateForCalendar = this.funCall.modalDate
  timeForCalendar = this.funCall.modalStartTime
  titleOfEvent = this.funCall.titleOfEventInMeeting
  nameOfEventHost = this.funCall.nameOfMeetingHost
  
  errorMsgNumber : number

  eventDataModel: ModalData = new ModalData()
  constructor(private formbuilder: FormBuilder, public api: ApiService, public funCall : CalendarComponent) { }
  
  ngAfterViewInit(): void {
    //console.log(this.calendarData.modalDate)
    // this.dateForCalendar = this.calendarData.modalDate
    // this.timeForCalendar = this.calendarData.modalTime
  }

  @ViewChild(CalendarComponent) calendarData !: CalendarComponent

  ngOnInit(): void {

    this.formValue = this.formbuilder.group({
      nameOfOrganiser: [null],
      dateMeeting: [null],
      startTime: [null],
      endTime: [null],
      personInMeet: [null]
    })

    }

  addMins(minute:any) {
    var minsToAdd = minute;
    var time = this.formValue.value.startTime;
    var newTime = new Date(new Date("1970/01/01 " + time).getTime() + minsToAdd * 60000).toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit', hour12: false });
    this.newEndTime = newTime
  }

  postDataOfEvent() {
    this.eventDataModel.nameOfOrganiser = this.formValue.value.nameOfOrganiser
    this.eventDataModel.dateMeeting = this.formValue.value.dateMeeting
    this.eventDataModel.startTime = this.formValue.value.startTime
    this.eventDataModel.endTime = this.formValue.value.endTime
    this.eventDataModel.personInMeet = this.formValue.value.personInMeet
    
    this.api.createMeeting(this.eventDataModel)
      .subscribe(res => {
        console.log(res)
        alert("Meeting Scheduled")
        let ref = document.getElementById('cancel')
        ref?.click()
        this.formValue.reset()
        window.location.reload()
      }, err => {
        //this.errorMsg = err.err.message
        console.log(err)
        this.errorMsgNumber = err.error.status
        console.log(this.errorMsgNumber)
        //alert(err.error.message)
        if(err.error.status ==500)
        {
          console.log(err.error.message)
          alert(err.error.message)
          let ref = document.getElementById('cancel')
          ref?.click()
          window.location.reload()
          this.formValue.reset()
        }
        else if(err.error.status == 400)
        {
          //console.log(err.error.message)
          alert(err.error.message)
        }
        else if(err.error.status == 406)
        {
          //console.log(err.error.message)
          alert(err.error.message)
        }
        //alert("Meeting cannot be scheduled right now as room is already booked")
        //this.formValue.reset()
        // let ref = document.getElementById('cancel')
        // ref?.click()
        //window.location.reload()
        //this.ngOnInit()
      })
  }

  // closeEventModal(){
  //   //console.log('working')
  //   let ref = document.getElementById('cancel')
  //   ref?.click()
  //   this.formValue.reset()
  // }
}