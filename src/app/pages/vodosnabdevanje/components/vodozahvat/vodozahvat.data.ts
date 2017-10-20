import {JavnoPreduzece} from "../../admin/components/javno_preduzece/javno_preduzece.data";
import {Mesto} from "../../admin/components/opstina/opstinadata";

export class Vodozahvat {
  id: number;
  naziv: string;
  adresa: string;
  javnoPreduzece: JavnoPreduzece;
  mesto: Mesto;
  napomena: string;
  version: number;
}
