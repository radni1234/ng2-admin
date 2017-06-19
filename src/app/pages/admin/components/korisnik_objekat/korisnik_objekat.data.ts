import {Objekat} from "../../../javniobjekti/components/objekti/objekatdata";
import {Korisnik, User} from "../korisnik/korisnikdata";

export class KorisnikObjekat {
  id: number;
  objekat: Objekat;
  korisnik: User;
  version: number
}

export class KorisnikObjekatView {
  id: number;
  objekatId: number;
  objekat: string;
  korisnikId: number;
  korisnik: string;
}
