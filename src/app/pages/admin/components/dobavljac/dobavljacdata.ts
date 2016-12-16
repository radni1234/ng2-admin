export class Dobavljac{
  id: number;
  naziv: string;
  version: number;
  mesto: Mesto;
  opstina: Opstina;
  tel: string;
  mail: string;
  web: string;

}
export class Mesto {
  id: number;
  naziv: string;
  opstina: Opstina;
  version: number;
}

export class Opstina {
  id: number;
  naziv: string;
  version: number;
}


