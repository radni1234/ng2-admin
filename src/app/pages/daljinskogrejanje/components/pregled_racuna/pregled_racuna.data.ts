import {Energent} from "../../../admin/components/energent/energentdata";
import {RnTip, RnStavke} from "../../../javniobjekti/components/racuni/racundata";
import {Dobavljac} from "../../../admin/components/dobavljac/dobavljacdata";
import {BrojiloKotlarnica} from "../brojilo/brojilo.data";

export class RacunKotlarnica{
  id: number;
  brojiloKotlarnica: BrojiloKotlarnica;
  version: number;
  energent: Energent;
  dobavljac: Dobavljac;
  rnTip: RnTip;
  brojRn: string;
  datumr: string;
  napomena: string;
  rnStavke: RnStavke[];
}
