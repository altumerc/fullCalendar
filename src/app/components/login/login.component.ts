import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder,FormGroup, NgForm} from '@angular/forms';
import  {ApiService} from '../../api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formValue !: FormGroup;
  constructor(private router:Router,private formbuilder: FormBuilder,private apiService:ApiService) {
   }
   goToPage(){
     this.router.navigateByUrl('calendar');
   }
   model={
     e_id:'',
     pwd:''
   };

  ngOnInit(): void {
    this.formValue = this.formbuilder.group(
      {
        e_id:[''],
        pwd:['']
      }
    )
  }
  visible:boolean=true;
  changetype:boolean=true;
  toggle(){
    this.visible=!this.visible;
    this.changetype=!this.changetype;
  }
  onSubmit(form:NgForm){

  }
}