import styles from './App.module.css';
import { andric } from './andric/andric';
import { initData, search } from './andric/andricSearch';
import { JSX, createSignal } from 'solid-js';

function App() {
  initData(andric);
  const [dataSet, setDataSet] = createSignal(andric.slice(0, 100));

  async function searchWords(event: { target: { value: string; }; }) {
    const value: string = event.target.value;

    if (value == "") {
      setDataSet(andric.slice(0, 100));
      return;
    }

    const searchResult = await search(value);
    console.log(searchResult);
    const searchedData = searchResult.map((search) => andric.find((it) => it.uniqId == search.id)).slice(0, 100);
    console.log(searchedData);
    setDataSet(searchedData);
  }

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <input class={styles.input} onchange={searchWords}></input>
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
