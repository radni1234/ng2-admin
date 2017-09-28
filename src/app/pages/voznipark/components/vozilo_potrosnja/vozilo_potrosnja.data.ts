import {Vozilo} from "../vozilo/vozilo.data";
import {Energent} from "../../../admin/components/energent/energentdata";

export class VoziloPotrosnja{
  id: number;
  vozilo: Vozilo;
  energent: Energent;
  potrosnja: number;
  iznos: number;
  datum: Date;
  version: number;
}
