import {Stub} from "../stub/stub.data";
import {SvetiljkaTip} from "../../../admin/components/tip_svetiljke/tip_svetiljke.data";

export class Svetiljka{
  id: number;
  stub: Stub;
  svetiljkaTip: SvetiljkaTip;
  kom: number;
  version: number;
}
