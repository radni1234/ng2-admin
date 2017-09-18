import {Trafo} from "../trafo/trafo.data";
import {StubTip} from "../../../admin/components/tip_stuba/tip_stuba.data";

export class Stub{
  id: number;
  trafo: Trafo;
  stubTip: StubTip;
  adresa: string;
  lonD: number;
  latD: number;
  gausX: number;
  gausY: number;
  rbr: number;
  adresaSlike: string;
  version: number;
}
