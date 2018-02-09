import {Opstina} from "../opstina/opstinadata";

export class Godina{
  id: number;
  god: number;
  naziv: string;
  version: number;
}
export class Mesec{
  id: number;
  naziv: string;
  version: number;
}

export class StepenDan{
  id: number;
  godina: number;
  mesec: Mesec;
  opstina: Opstina;
  sdIznos: number;
  version: number;
}
