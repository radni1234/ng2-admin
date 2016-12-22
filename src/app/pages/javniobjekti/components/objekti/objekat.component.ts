import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Stavka, Kamate, StartneVrednosti} from "./objekatfindata";
// webpack html imports
let template = require('./objekat.componet.html');

@Component({
  selector: 'accordion-demo',
  styles: [require('./objekat.scss')],
  template: template
})
export class ObjekatComponent implements OnInit{
  public oneAtATime:boolean = true;
  public items:Array<string> = ['Item 1', 'Item 2', 'Item 3'];
  private stavka: Stavka;
  private stavke: Stavka[] = new Array<Stavka>();
  private kamate: Kamate = new Kamate();
  private start: StartneVrednosti = new StartneVrednosti();
  private brojGodina: number = 10;
  private ucitan: boolean = false;

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
    while(this.stavke.length>0){
      this.stavke.pop();
    }
    var Finance = require('financejs');
    var finance = new Finance();
    console.log(finance.AM(20000, 7.5, 5, 0));
    console.log(2**4);



    for(var i = 0; i<this.brojGodina; i++){
      this.stavka = new Stavka ();
      this.stavka.rbGodina = i+1;
      this.stavka.prihodEnergent = this.start.startniPrihodEnergent * ((1 + this.kamate.kamPrihodEnergent/100)**(i+1));
      this.stavka.trosakEnergent = this.start.startniTrosakEnergent * ((1 + this.kamate.kamTrosakEnergent/100)**(i+1));
      console.log(this.stavka);
      console.log(i);
      this.stavke.push(this.stavka);
      this.stavka = null;
    }
    console.log(this.stavke);
    this.ucitan = true;
  }

  public addItem():void {
    this.items.push(`Items ${this.items.length + 1}`);
  }
  ngOnInit(){
    this.start.startniPrihodEnergent = 100000;
    this.start.startniTrosakEnergent = 70000;
    this.kamate.kamPrihodEnergent = 2;
    this.kamate.kamTrosakEnergent = 2;
    this.izracunaj();
  }
}
