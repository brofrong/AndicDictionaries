import Worker from "./worker?worker";
import MiniSearch from "minisearch";
import { TableInfo } from "./table";
import { zipObject } from "lodash";

type taskName = "init" | "search";

export type workerTask = {
  name: taskName;
  args: any;
};

const availableTasks: { [key in taskName]: (any) => any } = {
  init: initData,
  search: search,
};

let miniSearch: MiniSearch | undefined;

onmessage = async function (e: MessageEvent<[workerTask]>) {
  const task = e.data[0];
  const ret = availableTasks[task.name](task.args);
  postMessage(ret);
};

function initData(data: TableInfo) {
  miniSearch = new MiniSearch({
    fields: data.header,
    idField: "_id",
  });
  const namedBody = getNamedBody(data);
  miniSearch.addAll(namedBody);
}

function search({
  query,
  fuzzy,
  fields,
}: {
  query: string;
  fuzzy: number;
  fields: string[];
}) {
  return miniSearch.search(query, { fuzzy, fields });
}

function getNamedBody(data: TableInfo): { key: string }[] {
  const ret = [];
  for (let row of data.body) {
    ret.push(zipObject(data.header, row));
  }
  return ret;
}
