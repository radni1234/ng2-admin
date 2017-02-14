import {JedinicaMere} from "../energent/energentdata";
import {KolonaTip} from "../../../javniobjekti/components/racuni/racundata";

export class BrojiloVrsta{
  id: number;
  naziv: string;
  version: number;
  energentTip: EnergentTip;
}

export class BrojiloVrstaKolone{
  id: number;
  naziv: string;
  opis: string;
  brojiloVrsta: BrojiloVrsta;
  rbr: number;
  jedinicaMere: JedinicaMere;
  kolonaTip: KolonaTip;
  version: number;
}

export class EnergentTip{
  id: number;
  naziv: string;
  version: number;

}

