import MiniSearch from "minisearch";
import { AndicData, andric } from "./andric";

let miniSearch = new MiniSearch<AndicData>({
  idField: "uniqId",
  fields: ["obfuscated"], // fields to index for full-text search
  storeFields: ["obfuscated"], // fields to return with search results
});

function initData(data: AndicData[]) {
  miniSearch.addAll(data);
}

export async function search(wordToSearch: string, fuzzy: number) {
  return miniSearch.search(wordToSearch.replace(/[^а-яА-Я]/g, ""), {
    fuzzy: fuzzy,
  });
}

initData(andric);
