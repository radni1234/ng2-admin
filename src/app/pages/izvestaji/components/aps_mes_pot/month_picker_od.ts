import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'month-picker-od',

  template: `
    <div>

    <div class="col-xs-2">      
    <select class="form-control"  required>
            <option  *ngFor="let p of months"  [selected]="mm === p.val" [value]="p.val" >{{p.name}}</option>    
    </select>
    </div>

    </div>`
})

export class MonthPickerOd implements OnInit {

  mm : string = '01';

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

  }

}
