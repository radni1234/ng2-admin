import {Energent, JedinicaMere} from "../../../admin/components/energent/energentdata";
import {Godina, Mesec} from "../../../admin/components/stepen_dani/stepen_dani.data";
import {Dobavljac} from "../../../admin/components/dobavljac/dobavljacdata";
import {Objekat} from "../objekti/objekatdata";
import {EnergentTip, JedMere} from "../../../admin/components/brojilo_vrsta/brojilo_vrstadata";

export class Brojilo{
  id: number;
  naziv: string;
  brojiloTip: BrojiloTip;
  rezimMerenja: RezimMerenja;
  objekat: Objekat;
  vodeceBrojilo: Brojilo ;
  procenat: number;
  obracunskiPeriod: number;
  automatski: string;
  opis: String;
  brojiloVrsta: BrojiloVrsta;
  dobavljaci: Dobavljac[];
  version: number;
}

export class BrojiloTip {
  id: number;
  naziv: string;
  version: number;
};

export class BrojiloVrsta {
  id: number;
  naziv: string;
  energentTip: EnergentTip;
  rnTip: RnTip[];
  version: number;
};

export class RezimMerenja {
  id: number;
  naziv: string;
  version: number;
};

export class RnTip {
  id: number;
  naziv: string;
  version: number;
};

export class Racun{
  id: number;
  brojilo: Brojilo;
  version: number;
  energent: Energent;
  // godina: Godina;
  // mesec: Mesec;
  dobavljac: Dobavljac;
  rnTip: RnTip;
  brojRn: string;
  datumr: string;
  trendIskljuciti: boolean;
  napomena: string;
  rnStavke: RnStavke[];
}

export class RnStavke {
  id: number;
  brojiloVrstaKolone: BrojiloVrstaKolone;
  vrednost: number;
  version: number;
};

// export class RnIznos {
//   id: number;
//   brojiloVrstaKolone: BrojiloVrstaKolone;
//   vrednost: number;
//   version: number;
// };
//
// export class RnPotrosnja {
//   id: number;
//   brojiloVrstaKolone: BrojiloVrstaKolone;
//   vrednost: number;
//   version: number;
// };
//
// export class RnOstalo {
//   id: number;
//   brojiloVrstaKolone: BrojiloVrstaKolone;
//   vrednost: string;
//   version: number;
// };

export class BrojiloVrstaKolone {
  id: number;
  naziv: string;
  opis: string;
  brojiloVrsta: BrojiloVrsta;
  rbr: number;
  jedMere: JedMere;
  // jedinicaMere: JedinicaMere;
  kolonaTip: KolonaTip;
  obavezno: boolean;
  version: number;
};

export class KolonaTip {
  id: number;
  naziv: string;
  version: number;
};

export class MesecLista {
  id: number;
  naz: string;
};
