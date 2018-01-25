
import {JavnoPreduzece} from "../../../admin/components/javno_preduzece/javno_preduzece.data";
import {Mesto} from "../../../admin/components/opstina/opstinadata";
import {VodozahvatGrupa} from "../../../admin/components/vodozahvat_grupa/vodozahvat_grupa.data";

export class Vodozahvat {
  id: number;
  naziv: string;
  adresa: string;
  javnoPreduzece: JavnoPreduzece;
  vodozahvatGrupa: VodozahvatGrupa;
  mesto: Mesto;
  napomena: string;
  version: number;
}
