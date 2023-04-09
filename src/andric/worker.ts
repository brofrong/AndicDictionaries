import { search } from "./andricSearch";

onmessage = async function (e) {
  const result = e.data[0] * e.data[1];
  const workerResult = await search(e.data[0], e.data[1]);
  postMessage(workerResult);
};
