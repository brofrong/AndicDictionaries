import data from "../public/andic_examples.csv?raw";
import { plainToClass, Type } from "class-transformer";

export type AndicData = {
  glottocode: string;
  id_word: number;
  id_meaning: number;
  id: number;
  lemma: string;
  meanings_ru: string;
  example: string;
  reference: string;
};

function parseCSV(data: string): AndicData[] {
  const ret: AndicData[] = [];
  const parsed = data.split("\n");
  for (let i = 1; i < parsed.length; i++) {
    const splicedRaw = parsed[i].split(",");
    ret.push({
      glottocode: splicedRaw[0],
      id_word: +splicedRaw[1],
      id_meaning: +splicedRaw[2],
      id: +splicedRaw[3],
      lemma: splicedRaw[4],
      meanings_ru: splicedRaw[5],
      example: splicedRaw[6],
      reference: splicedRaw[7],
    });
  }
  return ret;
}

export const andric = parseCSV(data);
