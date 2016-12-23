export class Stavka {
  rbGodina: number;
  trosakEnergent: number;
  trosakOdrzavanje: number;
  trosakStruja: number;
  trosakOperativniTroskovi: number;
  trosakTelekomunikacije: number;
  trosakPepeo: number;
  trosakVrsno: number;
  trosakAdministracija: number;
  trosakOsiguranje: number;
  troskoviUkupno: number;
  ustedaEnergent: number;
  ustedaOdrzavanje: number;
  subvencija: number;
  prihodiUkupno;
  ebitda: number;
  troskoviKamate: number;
  ebtda: number;
  porezi: number;
  netoOstatak: number;
  glavnica: number;
  bilansNovcanihTokova: number;
}

export class Kamate {
  kamTrosakEnergent: number = 0.02;
  kamTrosakOdrzavanje: number = 0.02;
  kamTrosakStruja: number = 0.02;
  kamTrosakOperativniTroskovi: number = 0.02;
  kamTrosakPepeo: number = 0.02;
  kamTrosakVrsno: number = 0.02;
  kamTrosakTelekomunikacije: number = 0.02;
  kamTrosakAdministracija: number = 0.02;
  kamTrosakOsiguranje: number = 0.02;
  kamUstedaEnergent: number = 0.02;
  kamUstedaOdrzavanje: number = 0.02;
}

export class StartneVrednosti {
  startniTrosakEnergent: number = 70000;
  startniTrosakOdrzavanje: number = 70000;
  startniTrosakStruja: number = 70000;
  startniTrosakOperativniTroskovi: number = 70000;
  startniTrosakPepeo: number = 70000;
  startniTrosakVrsno: number = 70000;
  startniTrosakTelekomunikacije: number = 70000;
  startniTrosakAdministracija: number = 70000;
  startniTrosakOsiguranje: number = 70000;
  startnaUstedaEnergent: number = 100000;
  startnaUstedaOdrzavanje: number = 100000;
}
