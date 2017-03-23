import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'month-year-picker',

  template: `
    <div>

      <div class="col-xs-2">      
      <select class="form-control"  [(ngModel)]="mesOd">
              <option  *ngFor="let p of months" [value]="p.val" >{{p.name}}</option>    
      </select>      
      </div>

      <div class="col-xs-2">      
      <select class="form-control"  [(ngModel)]="godOd">
              <option  *ngFor="let y of years"  [value]="y">{{y}}</option>    
      </select>
      </div>

      <div class="col-xs-2">      
      <select class="form-control"  [(ngModel)]="mesDo">
              <option  *ngFor="let p of months" [value]="p.val" >{{p.name}}</option>    
      </select>      
      </div>

      <div class="col-xs-2">      
      <select class="form-control"  [(ngModel)]="godDo">
              <option  *ngFor="let y of years"  [value]="y">{{y}}</option>    
      </select>
      </div>

    </div>
    `

})

export class MonthYearPicker implements OnInit {

  mesOd: String;
  godOd: String;

  mesDo: String;
  godDo: String;

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

  years: number[] =[];
  private yy : number;

  ngOnInit() {
    this.getYear();
    this.postaviDatume();
  }

  getYear(){
    var today = new Date();
    this.yy = today.getFullYear();
    for(var i = (this.yy-15); i <= this.yy; i++){
      this.years.push(i);
    }
  }

  postaviDatume(){
    var today = new Date();

    this.godOd = today.getFullYear().toString();
    this.mesOd = '01';

    this.godDo = today.getFullYear().toString();
    this.mesDo;

    var mesec = today.getMonth()+1;

    if(mesec<10) {
      this.mesDo='0'+mesec;
    }

  }

}
