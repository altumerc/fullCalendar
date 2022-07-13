import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) {
   }
   goToPage(){
     this.router.navigateByUrl('calendar');
   }
  ngOnInit(): void {
  }
  visible:boolean=true;
  changetype:boolean=true;
  toggle(){
    this.visible=!this.visible;
    this.changetype=!this.changetype;
  }
}