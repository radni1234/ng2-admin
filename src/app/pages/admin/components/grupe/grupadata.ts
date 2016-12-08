export class Grupa {
  id: number;
  naziv: string;
  version: number;
}
export class Podgrupa {
  id: number;
  naziv: string;
  grupa: Grupa;
  version: number;
}
