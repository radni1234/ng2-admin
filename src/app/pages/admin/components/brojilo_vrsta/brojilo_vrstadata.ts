import {JedinicaMere} from "../energent/energentdata";
import {KolonaTip, RnTip} from "../../../javniobjekti/components/racuni/racundata";

export class BrojiloVrsta{
  id: number;
  naziv: string;
  version: number;
  energentTip: EnergentTip;
  rnTip: RnTip[];
}

export class BrojiloVrstaKolone{
  id: number;
  naziv: string;
  opis: string;
  brojiloVrsta: BrojiloVrsta;
  rbr: number;
  jedMere: JedMere;
  kolonaTip: KolonaTip;
  obavezno: boolean;
  version: number;
}

export class EnergentTip{
  id: number;
  naziv: string;
  version: number;

}


export class JedMere{
  id: number;
  naziv: string;
  version: number;
}

