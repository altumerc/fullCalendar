import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalData } from './modalData.model'
import { ApiService } from 'src/app/api.service'
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})


export class ModalComponent implements OnInit {

  formValue !: FormGroup
  newEndTime: String = ""

  eventDataModel: ModalData = new ModalData()
  constructor(private formbuilder: FormBuilder, private api: ApiService, private funCall : CalendarComponent) { }


  ngOnInit(): void {

    this.formValue = this.formbuilder.group({
      nameOfOrganiser: [null],
      dateMeeting: [null],
      startTime: [null],
      endTime: [null]
    })
  }

  
  addMins(minute:any) {
    var minsToAdd = minute;
    var time = this.formValue.value.startTime;
    var newTime = new Date(new Date("1970/01/01 " + time).getTime() + minsToAdd * 60000).toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit', hour12: false });
    this.newEndTime = newTime
  }


  postDataOfEvent() {
    this.eventDataModel.dateMeeting = this.formValue.value.dateMeeting
    this.eventDataModel.startTime = this.formValue.value.startTime
    this.eventDataModel.endTime = this.formValue.value.endTime
    //console.log(this.eventDataModel)
    this.api.createMeeting(this.eventDataModel)
      .subscribe(res => {
        console.log(res)
        alert("Meeting Scheduled")
        let ref = document.getElementById('cancel')
        ref?.click()
        // this.api.getEventsStart()
        window.location.reload()
      }, err => {
        console.log(err)
        alert("Meeting cannot be scheduled right now")
      })
  }
}
