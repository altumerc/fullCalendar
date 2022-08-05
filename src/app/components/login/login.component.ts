import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  //items = this.apiService.getItems();
  checkoutForm = this.formbuilder.group(
    {
      e_id: '',
      pwd: ''
    }
  );
  constructor(
    private router: Router, private formbuilder: FormBuilder, private apiService: ApiService) { }

  onSubmit(): void {
    if (this.checkoutForm.value.e_id == 'admin' && this.checkoutForm.value.pwd == 'admin') {
      this.router.navigateByUrl('calendar')
    }
    else {
      alert('Wrong emp id or password')
    } 
    }
  
  visible: boolean = true;
  changetype: boolean = true;
  loginTrue!: boolean
  toggle() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  /* onSubmit(form: NgForm) {
    alert(form.value)
    this.apiService.login(form.value).subscribe(response => {
      this.loginTrue = response
      if (this.loginTrue == true) {
        this.router.navigateByUrl('calendar')
      }
    }) */
}
