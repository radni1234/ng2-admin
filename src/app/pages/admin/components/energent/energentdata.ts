export class Energent{
  id: number;
  naziv: string;
  version: number;
  energentTip: EnergentTip;
  jedMere: JedinicaMere;
  kwhJm: number;
  emisija: number;
  sifra: number;
  racun: string;


}

export class EnergentTip{
  id: number;
  naziv: string;
  version: number;

}

export class JedinicaMere{
  id: number;
  naziv: string;
  version: number;
}
