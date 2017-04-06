import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.css')],
  template: require('./login.html'),
})
export class Login implements OnInit {

  // public form:FormGroup;
  // public email:AbstractControl;
  // public password:AbstractControl;
  // public submitted:boolean = false;
  //
  // constructor(fb:FormBuilder) {
  //   this.form = fb.group({
  //     'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
  //     'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
  //   });
  //
  //   this.email = this.form.controls['email'];
  //   this.password = this.form.controls['password'];
  // }
  //
  // public onSubmit(values:Object):void {
  //   this.submitted = true;
  //   if (this.form.valid) {
  //     // your code goes here
  //     // console.log(values);
  //   }
  // }

  model: any = {};
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          // login successful
          // this.router.navigate(['/pages/dashboard']);
          //
          this.router.navigateByUrl('/pages/dashboard');
          //window.location.reload();
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      }, error => {
        this.loading = false;
        this.error = error;
      });
  }

}
