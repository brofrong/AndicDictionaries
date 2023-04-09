import FlexSearch, { Index } from "flexsearch";
import { AndicData } from "./andric";

const index: Index<number> = new FlexSearch({
  profile: "match",
  charset: "latin:extra",
  resolution: 5,
}) as any;

export function initData(data: AndicData[]) {
  data.forEach((andric) => {
    index.add(andric.id, andric.lemma);
  });
}

export async function search(wordToSearch: string): Promise<number[]> {
  return index.search(wordToSearch, { limit: 100 });
}
