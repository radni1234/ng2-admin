export class Opstina {
  id: number;
  naziv: string;
  version: number;
}
export class Mesto {
  id: number;
  naziv: string;
  opstina: Opstina;
}
