import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from "../services/authentication.service";
import {Router, Routes} from "@angular/router";
import {MENU} from "../../app.menu";
import {BaMenuService} from "../../theme/services/baMenu/baMenu.service";
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Korisnik} from "../admin/components/korisnik/korisnikdata";
import {CrudService} from "../services/crud.service";

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
  // noviMenu = _.cloneDeep(MENU);
  // korisnik: Korisnik;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private service: BaMenuService,
    private translate: TranslateService,
    private crudService: CrudService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  // getKorisnik(korisnik: string){
  //
  //   this.crudService.getSingle("korisnik/jedan?username="+korisnik).subscribe(
  //     data => {this.korisnik = data;
  //       console.log("getKorisnik - ulaz");
  //       console.log(data);
  //
  //       console.log(this.noviMenu["0"]);
  //       console.log(this.noviMenu["0"].children["3"]);
  //
  //       let provera = JSON.parse(localStorage.getItem('currentUser')) === null ? false : (JSON.parse(localStorage.getItem('currentUser')).uloga === 'Manager' || JSON.parse(localStorage.getItem('currentUser')).uloga === 'Admin')  ? false : true;
  //
  //       // administacija
  //       this.noviMenu["0"].children["0"].data.menu.hidden = provera;
  //
  //       // ostali podsistemi
  //       this.noviMenu["0"].children["1"].data.menu.hidden = !this.korisnik.psObjekti;
  //       this.noviMenu["0"].children["3"].data.menu.hidden = !this.korisnik.psGrejanje;
  //       this.noviMenu["0"].children["4"].data.menu.hidden = !this.korisnik.psRasveta;
  //       this.noviMenu["0"].children["5"].data.menu.hidden = !this.korisnik.psVozila;
  //       this.noviMenu["0"].children["6"].data.menu.hidden = !this.korisnik.psVodosnabdevanje;
  //
  //       this.service.updateMenuByRoutes(<Routes>this.noviMenu);
  //     },
  //     error => {console.log(error); });
  //
  // }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          // login successful
          // this.router.navigate(['/pages/dashboard']);
          //

          // this.getKorisnik(this.model.username);

          console.log("Login component: ");



          console.log(this.translate.getLangs());
          this.translate.get('general.menu.administration').subscribe((res: string) => {
            // this.noviMenu["0"].children["0"].data.menu.title = res;
            console.log(res);
          });
          this.translate.get('general.menu.publicbuildings').subscribe((res: string) => {
            // this.noviMenu["0"].children["1"].data.menu.title = res;
            console.log(res);
          });
//          this.noviMenu["0"].children["0"].data.menu.title = this.translate.get('general.menu.admistration');
          //jedinice mere
//          this.noviMenu["0"].children["0"].children["1"].data.menu.hidden = provera;

          // console.log('Updating routes');
          // this.service.updateMenuByRoutes(<Routes>this.noviMenu);
          // console.log(this.noviMenu);
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
