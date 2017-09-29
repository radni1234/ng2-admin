import {JavnoPreduzece} from "../../../admin/components/javno_preduzece/javno_preduzece.data";
import {KategorijaVozila} from "../../../admin/components/kategorija_vozila/kategorija_vozila.data";
import {Energent} from "../../../admin/components/energent/energentdata";

export class Vozilo{
  id: number;
  javnoPreduzece: JavnoPreduzece;
  kategorijaVozila: KategorijaVozila;
  energenti: Energent[];
  godiste: number;
  marka: string;
  model: string;
  kubikaza: number;
  emisiona_klasa: string;
  registracija: string;
  version: number;
}
