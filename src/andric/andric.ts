import data from "../public/andic_examples.csv?raw";
import { plainToClass, Type } from "class-transformer";

export type AndicData = {
  glottocode: string;
  uniqId: number;
  id_word: number;
  id_meaning: number;
  id: number;
  lemma: string;
  obfuscated: string;
  meanings_ru: string;
  example: string;
  reference: string;
};

function parseCSV(data: string): AndicData[] {
  const ret: AndicData[] = [];
  const parsed = data.split("\n");
  for (let i = 1; i < parsed.length; i++) {
    const splicedRaw = parsed[i].split(",");
    const obfuscated = splicedRaw[4]?.replace(/[^а-яА-Я]/g, "");
    if (!obfuscated) {
      continue;
    }
    ret.push({
      glottocode: splicedRaw[0],
      uniqId: i,
      id_word: +splicedRaw[1],
      id_meaning: +splicedRaw[2],
      id: +splicedRaw[3],
      lemma: splicedRaw[4],
      obfuscated: obfuscated,
      meanings_ru: splicedRaw[5],
      example: splicedRaw[6],
      reference: splicedRaw[7],
    });
  }
  return ret;
}

export const andric = parseCSV(data);
