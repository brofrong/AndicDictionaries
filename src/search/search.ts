import SearchWorker from "./searchWorker?worker";
import { workerTask } from "./searchWorker";
import { TableInfo } from "./table";
import { SearchResult } from "minisearch";

if (!window.Worker) {
  console.error("Your browser doesn't support web workers.");
}

const worker = new SearchWorker();

export async function search(
  query: string,
  fuzzy: number,
  fields: string[]
): Promise<SearchResult[]> {
  return toWorker({ name: "search", args: { query, fuzzy, fields } });
}

export async function initSearch(data: TableInfo) {
  return toWorker({ name: "init", args: data });
}

async function toWorker(params: workerTask): Promise<any> {
  return new Promise((resolve) => {
    worker.onmessage = (e) => {
      resolve(e.data);
    };
    worker.postMessage([params]);
  });
}
