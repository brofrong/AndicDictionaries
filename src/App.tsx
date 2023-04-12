import { createSignal } from 'solid-js';
import andricCSV from "./public/andic_examples.csv?raw";
import styles from './App.module.css';
import { Table } from './components/Table';
import { search } from './search/search';
import { TableStore } from './search/tableStore';

function App() {
  const andricTable = new TableStore(andricCSV);
  const [searchColumns, setSearchColumns] = createSignal(andricTable.tableFullData.header);
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        {/* <div class={styles.search}> */}
        <input class={styles.input} onInput={(event) => { andricTable.search(event.target.value, { fields: searchColumns(), fuzzy: 0.4 }) }} />
        {/* <div>
            строгость поиска:
            <input type="range" onInput={(event) => setFuzzy(+event.target.value)} min="0" step='10' max="100" value="20" id="myRange" />
            {fuzzy()}
          </div> */}
        {/* </div> */}
        <Table table={andricTable} onSelectSearch={(columns) => setSearchColumns(columns)} />
      </header>
    </div>
  );
}

export default App;
