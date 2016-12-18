export class Objekat{
  id: number;
  naziv: string;
  adresa: string;
  lon: number;
  lat: number;
  godIzgr: number;
  projektanFirma: string;
  izvodjacIzg: string
  godRekon: number;
  izvodjacRekon: string;
  tipRek: string;
  koIme: string;
  koPrezime: string;
  koZanimanje: string;
  koTel: string;
  koFaks: string;
  koMob: string;
  koMail: string;
  opBrEtaza: number;
  opBrRdNed: number;
  opBrRdGod: number;
  opPbrRsDan: number;
  opBrNrdZima: number;
  opBrNrdLeto: number;
  opBrStalnoZap: number;
  opBrKor: number;
  grejOpis: string;
  grejZa: number;
  grejPoKorisna: number;
  grejUkSnaga: number;
  grejUkSnagaTela: number;
  hlaOpis: string;
  hlaPo: number;
  hlaZa: number;
  hlaUkSnaga: number;
  ventOpis: string;
  ventZa: number;
  ventUkSnaga: number;
  toplOpis: string;
  toplTemp: number;
  toplUkSnaga: number;
  vodaOpis: string;
  elOpis: string;
  elSnagaPotrosaca: number;
  elSnagaGrejalica: number;
  elSnagaRasveta: number;
  trendTolerancija: number;
  alarmTrend: string;
  alarmTrendStart: string;
  version: number;
  podgrupa: Podgrupa;
  mesto: Mesto;
  nacinFinansiranja: NacinFinansiranja;

}

export class Grupa {
  id: number;
  naziv: string;
  version: number;
}
export class Podgrupa {
  id: number;
  naziv: string;
  grupa: Grupa;
  version: number;
}

export class NacinFinansiranja{
  id: number;
  naziv: string;
  version: number;
}

export class Opstina {
  id: number;
  naziv: string;
  version: number;
}
export class Mesto {
  id: number;
  naziv: string;
  opstina: Opstina;
  version: number;
}

