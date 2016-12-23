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
      this.stavka.ustedaEnergent = this.start.startnaUstedaEnergent * ((1 + this.kamate.kamUstedaEnergent/100)**(i+1));
      this.stavka.ustedaOdrzavanje = this.start.startnaUstedaOdrzavanje * ((1 + this.kamate.kamUstedaOdrzavanje/100)**(i+1));

      this.stavka.trosakEnergent = this.start.startniTrosakEnergent * ((1 + this.kamate.kamTrosakEnergent/100)**(i+1));
      this.stavka.trosakOdrzavanje = this.start.startniTrosakOdrzavanje * ((1 + this.kamate.kamTrosakOdrzavanje/100)**(i+1));
      this.stavka.trosakStruja = this.start.startniTrosakStruja * ((1 + this.kamate.kamTrosakStruja/100)**(i+1));
      this.stavka.trosakOperativniTroskovi = this.start.startniTrosakOperativniTroskovi * ((1 + this.kamate.kamTrosakOperativniTroskovi/100)**(i+1));
      this.stavka.trosakTelekomunikacije = this.start.startniTrosakTelekomunikacije * ((1 + this.kamate.kamTrosakTelekomunikacije/100)**(i+1));
      this.stavka.trosakPepeo = this.start.startniTrosakPepeo * ((1 + this.kamate.kamTrosakPepeo/100)**(i+1));
      this.stavka.trosakVrsno = this.start.startniTrosakVrsno * ((1 + this.kamate.kamTrosakVrsno/100)**(i+1));
      this.stavka.trosakAdministracija = this.start.startniTrosakAdministracija * ((1 + this.kamate.kamTrosakAdministracija/100)**(i+1));
      this.stavka.trosakOsiguranje = this.start.startniTrosakOsiguranje * ((1 + this.kamate.kamTrosakOsiguranje/100)**(i+1));

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
    this.start.startniTrosakEnergent = 70000;
    this.start.startniTrosakOdrzavanje = 70000;
    this.start.startniTrosakStruja = 70000;
    this.start.startniTrosakOperativniTroskovi = 70000;
    this.start.startniTrosakPepeo = 70000;
    this.start.startniTrosakVrsno = 70000;
    this.start.startniTrosakTelekomunikacije = 70000;
    this.start.startniTrosakAdministracija = 70000;
    this.start.startniTrosakOsiguranje = 70000;
    
    this.start.startnaUstedaEnergent = 100000;
    this.start.startnaUstedaOdrzavanje = 100000;
    
    this.kamate.kamTrosakEnergent = 2;
    this.kamate.kamTrosakOdrzavanje = 2;
    this.kamate.kamTrosakStruja = 2;
    this.kamate.kamTrosakOperativniTroskovi = 2;
    this.kamate.kamTrosakPepeo = 2;
    this.kamate.kamTrosakVrsno = 2;
    this.kamate.kamTrosakTelekomunikacije = 2;
    this.kamate.kamTrosakAdministracija = 2;
    this.kamate.kamTrosakOsiguranje = 2;
    this.kamate.kamUstedaEnergent = 2;
    this.kamate.kamUstedaOdrzavanje = 2;
    
    this.izracunaj();
  }
}
