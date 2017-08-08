import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'two-year-picker',

  template: `
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-block">
                 
      
            <div class="col-xs-6">      
            <select class="form-control"  [(ngModel)]="godOd">
                    <option  *ngFor="let y of years"  [value]="y">{{y}}</option>    
            </select>
            </div>
      
      
            <div class="col-xs-6">      
            <select class="form-control"  [(ngModel)]="godDo">
                    <option  *ngFor="let y of years"  [value]="y">{{y}}</option>    
            </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    `

})

export class YearPicker implements OnInit {


  godOd: String;


  godDo: String;

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

    this.godOd = (today.getFullYear()-1).toString();


    this.godDo = today.getFullYear().toString();



  }

}
