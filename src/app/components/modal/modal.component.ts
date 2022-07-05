import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {ModalData} from './modalData.model'
import { ApiService} from 'src/app/api.service'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})


export class ModalComponent implements OnInit  {
 
  formValue !: FormGroup

  eventDataModel : ModalData = new ModalData()
  constructor(private formbuilder : FormBuilder, private api : ApiService){ }
 
 
  ngOnInit(): void {

    this.formValue = this.formbuilder.group({
      
      dateMeeting: [null],
      startTime: [null],
      endTime : [null]
    })
  }

  postDataOfEvent(){
    this.eventDataModel.dateMeeting = this.formValue.value.dateMeeting
    this.eventDataModel.startTime = this.formValue.value.startTime
    this.eventDataModel.endTime = this.formValue.value.endTime
    console.log(this.eventDataModel)
    this.api.createMeeting(this.eventDataModel)
    .subscribe(res =>{
      console.log(res)
      alert("Meeting Scheduled")
      let ref = document.getElementById('cancel')
      ref?.click()
      this.api.getEventsStart()
     },err =>{
       console.log(err)
       alert("Meeting cannot be scheduled right now")
     })
  }
}
