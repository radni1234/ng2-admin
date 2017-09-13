import {Podstanica} from "../podstanica/podstanica.data";

export class PodstanicaPotrosnja {
  id: number;
  datum: string;
  potrosnjaKwh: number;
  podstanica: Podstanica;
  version: number;
}
