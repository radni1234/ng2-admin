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
export class Opstina{
  id: number;
  naziv: string;
  version: number;
}
export class StepenDan{
  id: number;
  godina: Godina;
  mesec: Mesec;
  opstina: Opstina;
  sdIznos: number;
  version: number;
}
