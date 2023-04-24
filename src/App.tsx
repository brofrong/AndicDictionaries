import { Show, createSignal, onMount } from 'solid-js';
import andricCSV from "./assets/andic_examples.csv";
import styles from './App.module.css';
import { Table } from './components/Table';
import { search } from './search/search';
import { TableStore } from './search/tableStore';
import { Input } from './components/Input';

async function fetchTable(url: string): Promise<string> {
  const ret = await fetch(url);
  return ret.text();
}

function App() {
  const [tableData, setTableData] = createSignal<TableStore | null>(null);
  const [searchColumns, setSearchColumns] = createSignal<string[] | null>(null);

  onMount(async () => {
    const tableData = await fetchTable(andricCSV);
    const tableStorage = new TableStore(tableData);
    setTableData(tableStorage);
    setSearchColumns(tableStorage.tableFullData.header);
  });

  return (
    <div class="p-6 bg-slate-700 text-white">
      <Show when={tableData() != null} fallback={<div>loading...</div>}>
        <div class="mb-4 max-w-md">
          <Input name='search' id='search' title="Поиск" placeholder='бакабака' onInput={(event) => { tableData().search(event.target.value, { fields: searchColumns(), fuzzy: 0.4 }) }} />
        </div>
        {/* <div>
            строгость поиска:
            <input type="range" onInput={(event) => setFuzzy(+event.target.value)} min="0" step='10' max="100" value="20" id="myRange" />
            {fuzzy()}
          </div> */}
        {/* </div> */}
        <Table table={tableData()} onSelectSearch={(columns) => setSearchColumns(columns)} />
      </Show>
    </div>
  );
}

export default App;
