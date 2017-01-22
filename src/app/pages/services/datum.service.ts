import {Injectable} from "@angular/core";

@Injectable()
export class DatumService {

  public toDate(dateStr) {
    var parts = dateStr.split(".");
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }

}
