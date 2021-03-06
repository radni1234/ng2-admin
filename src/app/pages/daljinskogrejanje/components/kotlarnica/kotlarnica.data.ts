import {JavnoPreduzece} from "../../../admin/components/javno_preduzece/javno_preduzece.data";

export class Kotlarnica {
  id: number;
  naziv: string;
  adresa: string;
  lon: number;
  lat: number;
  javnoPreduzece: JavnoPreduzece;
  napomena: string;
  version: number;
}
