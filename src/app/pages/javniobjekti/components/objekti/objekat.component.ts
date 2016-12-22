import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Stavka} from "./objekatfindata";
// webpack html imports
let template = require('./objekat.componet.html');

@Component({
  selector: 'accordion-demo',
  template: template
})
export class ObjekatComponent implements OnInit{
  public oneAtATime:boolean = true;
  public items:Array<string> = ['Item 1', 'Item 2', 'Item 3'];
  private stavke: Stavka[];

  public status:Object = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

  public groups:Array<any> = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  public izracunaj() {
    var Finance = require('financejs');

    var finance = new Finance();


    // To calculate Amortization

    console.log(finance.AM(20000, 7.5, 5, 0));

    // => 400.76

  }

  public addItem():void {
    this.items.push(`Items ${this.items.length + 1}`);
  }
  ngOnInit(){
    this.izracunaj();
  }
}
