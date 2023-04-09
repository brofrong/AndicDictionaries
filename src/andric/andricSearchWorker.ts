import { AndicData } from "./andric";
import Worker from "./worker?worker";

if (!window.Worker) {
  console.error("Your browser doesn't support web workers.");
}

const worker = new Worker();

export async function search(
  searchString: string,
  fuzzy: number
): Promise<AndicData[]> {
  return new Promise((resolve) => {
    worker.onmessage = (e) => {
      resolve(e.data);
    };
    worker.postMessage([searchString, fuzzy]);
  });
}
