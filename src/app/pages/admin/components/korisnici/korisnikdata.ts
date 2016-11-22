import DateTimeFormat = Intl.DateTimeFormat;

export class Mesto {
  id: number;
  naziv: string;
  opstina: Opstina;
  version: number;
}

export class KorisnikData {
  id: number;
  uloga: Uloga;
  mesto: Mesto;
  username: string;
  naziv: string;
  tel: string;
  fax: string;
  mob: string;
  mail: string;
  blokiran: string;
  rasveta: string;
  alarmRacun: string;
  alarmRacunStart: Date;
  alarmTrend: string;
  alarmTrendStart: DateTimeFormat;
  password: string;
  version: number;
}

export class Opstina {
  id: number;
  naziv: string;
  version: number;
}

export class Uloga {
  id: number;
  naziv: string;
  kraciNaz: string;
}


