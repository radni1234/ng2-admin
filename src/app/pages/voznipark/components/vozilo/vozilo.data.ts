import {JavnoPreduzece} from "../../../admin/components/javno_preduzece/javno_preduzece.data";
import {KategorijaVozila} from "../../../admin/components/kategorija_vozila/kategorija_vozila.data";
import {Energent} from "../../../admin/components/energent/energentdata";
import {VoziloEmisionaKlasa} from "../../../admin/components/vozilo_emisiona_klasa/vozilo_emisiona_klasa.data";

export class Vozilo{
  id: number;
  javnoPreduzece: JavnoPreduzece;
  kategorijaVozila: KategorijaVozila;
  energenti: Energent[];
  godiste: number;
  marka: string;
  model: string;
  kubikaza: number;
  voziloEmisionaKlasa: VoziloEmisionaKlasa;
  registracija: string;
  version: number;
}
