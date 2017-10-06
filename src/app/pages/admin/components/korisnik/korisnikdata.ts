import DateTimeFormat = Intl.DateTimeFormat;
import {Objekat} from "../../../javniobjekti/components/objekti/objekatdata";
import {JavnoPreduzece} from "../javno_preduzece/javno_preduzece.data";

export class Mesto {
  id: number;
  naziv: string;
  opstina: Opstina;
  version: number;
}

export class Korisnik {
  id: number;
  authorities: Authority[];
  mesto: Mesto;
  javnoPreduzece: JavnoPreduzece;
  username: string;
  naziv: string;
  tel: string;
  fax: string;
  mob: string;
  mail: string;
  blokiran: string;
  rasveta: string;
  alarmRacun: boolean;
  alarmRacunStart: string;
  alarmTrend: boolean;
  alarmTrendStart: string;
  password: string;
  objekti: Objekat[];
  psObjekti: boolean;
  psVozila: boolean;
  psRasveta: boolean;
  psVodosnabdevanje: boolean;
  psGrejanje: boolean;
  version: number;
}

export class User {
  id: number;
  authorities: Authority[];
  mesto: Mesto;
  username: string;
  naziv: string;
  tel: string;
  fax: string;
  mob: string;
  mail: string;
  blokiran: string;
  rasveta: string;
  alarmRacun: boolean;
  alarmRacunStart: string;
  alarmTrend: boolean;
  alarmTrendStart: string;
  password: string;
  psObjekti: boolean;
  psVozila: boolean;
  psRasveta: boolean;
  psVodosnabdevanje: boolean;
  psGrejanje: boolean;
  version: number;
}

export class Opstina {
  id: number;
  naziv: string;
  version: number;
}

export class Authority {
  id: number;
  name: string;
  kraciNaz: string;
  version: number;
}


