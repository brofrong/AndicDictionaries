import { Show, createSignal, onMount } from 'solid-js';
import andricCSV from "./assets/andic_examples.csv";
import { SearchInput } from './components/SearchInput';
import { Table } from './components/Table';
import { TableStore } from './search/tableStore';
import { Settings } from './components/Settings';
import { Loading } from './components/Loading';

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
      <Show when={tableData() != null} fallback={<Loading class="flex justify-center p-4" />}>
        <div class="mb-4 flex gap-4">
          <SearchInput searchFields={tableData().tableFullData.header} setSearch={tableData().setSearchValue} setSearchFields={tableData().setSearchColumns} />
          <Settings tableStore={tableData()} />
        </div>
        <Table table={tableData()} />
      </Show>
    </div>
  );
}

export default App;
