import { Accessor, Setter, createEffect, createSignal } from "solid-js";
import { TableInfo } from "./table";
import { initSearch, search } from "./search";

export class TableStore {
  public tableFullData: TableInfo;
  public filteredRows: Accessor<string[][]>;
  public setFilteredRows: Setter<string[][]>;

  public rowsToDisplay: Accessor<string[][]>;
  private setRowsToDisplay: Setter<string[][]>;

  private numberRowsToDisplay: Accessor<number>;
  private setNumberRowsToDisplay: Setter<number>;

  constructor(initData: string) {
    console.time("createTable");
    this.tableFullData = new TableInfo(initData);
    console.timeEnd("createTable");
    this.setSignals();
    console.time("createSearchIndex");
    initSearch(this.tableFullData);
    console.timeEnd("createSearchIndex");
  }

  private setSignals() {
    const [filteredRows, setFilteredRows] = createSignal(
      this.tableFullData.body
    );
    this.filteredRows = filteredRows;
    this.setFilteredRows = setFilteredRows;

    const [rowsToDisplay, setRowsToDisplay] = createSignal<string[][]>(
      this.tableFullData.body
    );
    this.rowsToDisplay = rowsToDisplay;
    this.setRowsToDisplay = setRowsToDisplay;

    const [numberRowsToDisplay, setNumberRowsToDisplay] = createSignal(100);
    this.numberRowsToDisplay = numberRowsToDisplay;
    this.setNumberRowsToDisplay = setNumberRowsToDisplay;

    createEffect(() => {
      const toShow = this.filteredRows().slice(0, numberRowsToDisplay());
      this.setRowsToDisplay(toShow);
    });
  }

  public async search(
    query: string,
    options?: { fuzzy: number; fields: string[] }
  ) {
    if (!query) {
      this.applyFiltered(this.tableFullData.body);
      return;
    }

    const ret = await search(query, 40 / 100, options.fields);
    const fullSearchData = ret.map((it) => this.tableFullData.body[it.id]);
    this.applyFiltered(fullSearchData);
  }

  public showMore() {
    this.setNumberRowsToDisplay(this.numberRowsToDisplay() + 100);
  }

  private applyFiltered(rows: string[][]) {
    this.setFilteredRows(rows);
    this.setNumberRowsToDisplay(100);
  }
}
