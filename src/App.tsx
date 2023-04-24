import { Show, createSignal, onMount } from 'solid-js';
import andricCSV from "./assets/andic_examples.csv";
import styles from './App.module.css';
import { Table } from './components/Table';
import { search } from './search/search';
import { TableStore } from './search/tableStore';
import { Input } from './components/Input';
import SearchIcon from './assets/svg/search_FILL0_wght300_GRAD0_opsz48.svg';
import { SearchInput } from './components/SearchInput';

async function fetchTable(url: string): Promise<string> {
  const ret = await fetch(url);
  return ret.text();
}

function App() {
  const [tableData, setTableData] = createSignal<TableStore | null>(null);

  onMount(async () => {
    const tableData = await fetchTable(andricCSV);
    const tableStorage = new TableStore(tableData);
    setTableData(tableStorage);
  });

  return (
    <div class="p-6 bg-slate-700 text-white w-full min-h-screen">
      <Show when={tableData() != null} fallback={<div>loading...</div>}>
        <div class="mb-4">
          <SearchInput searchFields={tableData().tableFullData.header} setSearch={tableData().setSearchValue} setSearchFields={tableData().setSearchColumns} />
        </div>
        {/* <div>
            строгость поиска:
            <input type="range" onInput={(event) => setFuzzy(+event.target.value)} min="0" step='10' max="100" value="20" id="myRange" />
            {fuzzy()}
          </div> */}
        {/* </div> */}
        <Table table={tableData()} />
      </Show>
    </div>
  );
}

export default App;
