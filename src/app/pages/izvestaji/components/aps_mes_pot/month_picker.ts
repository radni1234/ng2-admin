import {Component, OnInit} from '@angular/core';
// import { Month } from './month.ts';

@Component({
  selector: 'month-picker',

  template: `
    <div>

    <div class="col-xs-2">      
    <select class="form-control"  required>
            <option  *ngFor="let p of months"  [selected]="mm === p.val" [value]="p.val" >{{p.name}}</option>    
    </select>
    </div>

    </div>`
})

export class MonthPicker implements OnInit {

  mm : string;

  months = [
    { val: '01',  name: 'Januar' },
    { val: '02',  name: 'Februar' },
    { val: '03',  name: 'Mart' },
    { val: '04',  name: 'April' },
    { val: '05',  name: 'Maj' },
    { val: '06',  name: 'Jun' },
    { val: '07',  name: 'Jul' },
    { val: '08',  name: 'Avgust' },
    { val: '09',  name: 'Septembar' },
    { val: '10',  name: 'Oktobar' },
    { val: '11',  name: 'Novembar' },
    { val: '12',  name: 'Decembar' }
  ];

  ngOnInit() {
    this.getMonth();
  }

  getMonth(){
    var today = new Date();
    var mesec = today.getMonth()+1;
    this.mm = mesec.toString();
    if(mesec<10) {
      this.mm='0'+this.mm
    }
  }




}
