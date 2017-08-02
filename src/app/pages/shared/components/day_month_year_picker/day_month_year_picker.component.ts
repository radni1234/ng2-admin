import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'day-month-year-picker',

  template: `
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-block">

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
            <select class="form-control"  [(ngModel)]="mesDo" (ngModelChange)="onChange($event)">
                    <option  *ngFor="let p of months" [value]="p.val" >{{p.name}}</option>    
            </select>      
            </div>
      
            <div class="col-xs-2">      
            <select class="form-control"  [(ngModel)]="godDo" (ngModelChange)="onChange($event)">
                    <option  *ngFor="let y of years"  [value]="y">{{y}}</option>    
            </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    `

})

export class DayMonthYearPicker implements OnInit {

  danOd: String;
  mesOd: String;
  godOd: String;

  danDo: String;
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

  dana_mesec = {
    '01': 31,
    '02': 28,
    '03': 31,
    '04': 30,
    '05': 31,
    '06': 30,
    '07': 31,
    '08': 31,
    '09': 30,
    '10': 31,
    '11': 30,
    '12': 31

  }

  years: number[] =[];
  private yy : number;

  ngOnInit() {
    this.getYear();
    this.postaviDatume();
  }

  onChange($event){
    if(this.leapYear(this.godDo))
    {
      this.dana_mesec['02']=29;
      console.log("SDFGHJKLLLLP:KKLHJKJLHJKGH");
    }
    else{
      this.dana_mesec['02']=28;
    }
    this.danDo = this.dana_mesec[this.mesDo.toString()]
    console.log(this.danOd+'.'+this.mesOd+'.'+this.godOd);
    console.log(this.danDo+'.'+this.mesDo+'.'+this.godDo);
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
    this.danOd = '01';

    this.godDo = today.getFullYear().toString();

    var mesec = today.getMonth()+1;

    if(mesec<10) {
      this.mesDo='0'+mesec;
    }

    if(this.leapYear(this.godDo))
    {
      this.dana_mesec['02']=29;
      console.log("SDFGHJKLLLLP:KKLHJKJLHJKGH");
    }
    else{
      this.dana_mesec['02']=28;
    }
    this.danDo = this.dana_mesec[this.mesDo.toString()]

    console.log(this.danOd+'.'+this.mesOd+'.'+this.godOd);
    console.log(this.danDo+'.'+this.mesDo+'.'+this.godDo);

  }

  leapYear(a){

    var result;
    var year;
    console.log(a);
    year = parseInt(a);
    if (year%400==0){
      console.log('PRESTUPNA GODINA');
      result = true

    }
    else if(year%100==0){
      result = false
    }
    else if(year%4==0){
      console.log('PRESTUPNA GODINA');
      result= true
    }
    else{
      result= false
    }
    return result
  }

}
