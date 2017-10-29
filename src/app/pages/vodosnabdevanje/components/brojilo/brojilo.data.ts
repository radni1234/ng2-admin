import {BrojiloTip, RezimMerenja} from "../../../javniobjekti/components/racuni/racundata";
import {BrojiloVrsta} from "../../../admin/components/brojilo_vrsta/brojilo_vrstadata";
import {Dobavljac} from "../../../admin/components/dobavljac/dobavljacdata";
import {Vodozahvat} from "../vodozahvat/vodozahvat.data";

export class BrojiloVodozahvat{
  id: number;
  naziv: string;
  brojiloTip: BrojiloTip;
  rezimMerenja: RezimMerenja;
  vodozahvat: Vodozahvat;
  vodeceBrojilo: BrojiloVodozahvat ;
  procenat: number;
  obracunskiPeriod: number;
  automatski: string;
  opis: String;
  brojiloVrsta: BrojiloVrsta;
  dobavljaci: Dobavljac[];
  version: number;
}
