import {Objekat} from "../objekatdata";

export class ObjekatMere {
  id: number;
  objekat: Objekat;
  naziv: string;
  opis: string;
  datumMere: string;
  procUstede: number;
  vrednostInvesticije: number;
  aktivirati: boolean;
  version: number;
}
