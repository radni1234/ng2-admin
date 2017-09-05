import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from "../services/authentication.service";
import {Router, Routes} from "@angular/router";
import {MENU} from "../../app.menu";
import {BaMenuService} from "../../theme/services/baMenu/baMenu.service";

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
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
  noviMenu = _.cloneDeep(MENU);

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  private service: BaMenuService) { }

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


          let provera = JSON.parse(localStorage.getItem('currentUser')) === null ? false : (JSON.parse(localStorage.getItem('currentUser')).uloga === 'Manager' || JSON.parse(localStorage.getItem('currentUser')).uloga === 'Admin')  ? false : true;

          // administacija
          this.noviMenu["0"].children["0"].data.menu.hidden = provera;
          //jedinice mere
//          this.noviMenu["0"].children["0"].children["1"].data.menu.hidden = provera;

          console.log('Updating routes');
          this.service.updateMenuByRoutes(<Routes>this.noviMenu);
          console.log(this.noviMenu);
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
