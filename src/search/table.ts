import { Accessor, Setter, createEffect, createSignal } from "solid-js";
import { parseCSV } from "./csvParser";
import { initSearch } from "./search";

export class TableInfo {
  public header: string[];
  public body: string[][];
  //   public rowsToDisplay: Accessor<string[][]>;
  //   private setRowsToDisplay: Setter<string[][]>;
  //   private numberRowsToDisplay: Accessor<number>;
  //   private setNumberRowsToDisplay: Setter<number>;

  constructor(initData: string) {
    const parsedCSV = parseCSV(initData);
    this.header = parsedCSV.header;
    this.body = parsedCSV.body;

    // this.initRowsToDisplay();
  }

  //   public loadMore() {
  //     this.setNumberRowsToDisplay(this.numberRowsToDisplay() + 100);
  //   }

  //   private initRowsToDisplay() {
  //     const [rowsToDisplay, setRowsToDisplay] = createSignal<string[][]>([]);
  //     this.rowsToDisplay = rowsToDisplay;
  //     this.setRowsToDisplay = setRowsToDisplay;

  //     const [numberRowsToDisplay, setNumberRowsToDisplay] = createSignal(100);
  //     this.numberRowsToDisplay = numberRowsToDisplay;
  //     this.setNumberRowsToDisplay = setNumberRowsToDisplay;

  //     createEffect(() => {
  //       const toShow = this.body.slice(0, this.numberRowsToDisplay());
  //       this.setRowsToDisplay(toShow);
  //     });
  //   }
}
