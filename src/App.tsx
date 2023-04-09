import styles from './App.module.css';
import { andric } from './andric/andric';
import { search } from './andric/andricSearchWorker';
import { JSX, createEffect, createSignal, useContext } from 'solid-js';

function App() {
  const [dataSet, setDataSet] = createSignal([]);
  const [isLoading, setIsLoading] = createSignal(true);
  const [searchString, setSearchString] = createSignal("");
  const [fuzzy, setFuzzy] = createSignal(20);


  createEffect(async () => {
    setIsLoading(true);
    const searchValue = searchString();

    if (searchValue == "") {
      setDataSet(andric.slice(0, 100));
      setIsLoading(false);
      return;
    }
    setDataSet([]);
    const searchResult = await search(searchValue, fuzzy() / 100);
    const fullSearchData = searchResult.map((search) => andric.find((it) => it.uniqId == search.id));
    const searchedData = fullSearchData.slice(0, 100);
    setIsLoading(false);
    setDataSet(searchedData);
  })

  async function searchWords(event: { target: { value: string; }; }) {
    const value: string = event.target.value;
  }

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <div class={styles.search}>
          <input class={styles.input} onInput={(event) => { setSearchString(event.target.value) }} />
          <div>
            строгость поиска:
            <input type="range" onInput={(event) => setFuzzy(+event.target.value)} min="0" step='10' max="100" value="20" id="myRange" />
            {fuzzy()}
          </div>
        </div>
        {isLoading() ? <div>Поиск...</div> : <></>}
        <table>
          <thead>
            <tr>
              <td>glottocode</td>
              <td>id_word</td>
              <td>id_meaning</td>
              <td>id</td>
              <td>lemma</td>
              <td>meanings_ru</td>
              <td>example</td>
              <td>reference</td>
            </tr>
          </thead>
          <tbody>

            {dataSet().map((it) =>
              <tr>
                <td>{it.glottocode}</td>
                <td>{it.id_word}</td>
                <td>{it.id_meaning}</td>
                <td>{it.id}</td>
                <td>{it.lemma}</td>
                <td>{it.meanings_ru}</td>
                <td>{it.example}</td>
                <td>{it.reference}</td>
              </tr>
            )}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
