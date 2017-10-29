import {Energent} from "../../../admin/components/energent/energentdata";
import {RnTip, RnStavke} from "../../../javniobjekti/components/racuni/racundata";
import {Dobavljac} from "../../../admin/components/dobavljac/dobavljacdata";
import {BrojiloVodozahvat} from "../brojilo/brojilo.data";

export class RacunVodozahvat{
  id: number;
  brojiloVodozahvat: BrojiloVodozahvat;
  version: number;
  energent: Energent;
  dobavljac: Dobavljac;
  rnTip: RnTip;
  brojRn: string;
  datumr: string;
  napomena: string;
  rnStavke: RnStavke[];
}
