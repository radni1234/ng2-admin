import {BrojiloTip, RezimMerenja} from "../../../javniobjekti/components/racuni/racundata";
import {Kotlarnica} from "../kotlarnica/kotlarnica.data";
import {BrojiloVrsta} from "../../../admin/components/brojilo_vrsta/brojilo_vrstadata";
import {Dobavljac} from "../../../admin/components/dobavljac/dobavljacdata";

export class BrojiloKotlarnica{
  id: number;
  naziv: string;
  brojiloTip: BrojiloTip;
  rezimMerenja: RezimMerenja;
  kotlarnica: Kotlarnica;
  vodeceBrojilo: BrojiloKotlarnica ;
  procenat: number;
  obracunskiPeriod: number;
  automatski: string;
  opis: String;
  brojiloVrsta: BrojiloVrsta;
  dobavljaci: Dobavljac[];
  version: number;
}
