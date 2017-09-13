import {Kotlarnica} from "../kotlarnica/kotlarnica.data";

export class Podstanica {
  id: number;
  brojPodstanice: string;
  adresa: string;
  kotlarnica: Kotlarnica;
  grejnaPovrsina: string;
  instalisaniToplotniKapacitet: number;
  tipKalorimetra: string;
  napomena: string;
  version: number;
}
