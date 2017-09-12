
import {Kotlarnica} from "../kotlarnica/kotlarnica.data";
export class Kotao {
  id: number;
  kotlarnica: Kotlarnica;
  naziv: string;
  tip: string;
  proizvodjac: string;
  godinaProizvodnje: number;
  nominalnaSnaga: number;
  stepenKorisnosti: number;
  gorionikTip: string;
  gorionikProizvodjac: string;
  nominalnaSnagaGorionika: number;
  godinaProizvodnjeGorionika: number;
  radniPritisak: number;
  tempVodeNaPotisnomVodu: number;
  tempVodeNaPovratnomVodu: number;
  regulacijaKotla: string;
  napomena: string;
  version: number;
}
