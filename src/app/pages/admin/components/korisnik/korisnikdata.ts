import DateTimeFormat = Intl.DateTimeFormat;

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


