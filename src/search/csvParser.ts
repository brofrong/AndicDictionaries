const csvRegexp = /(?:\s*(?:\"([^\"]*)\"|([^,]+))\s*,?)+?/g;

export function parseCSV(data: string): { header: string[]; body: string[][] } {
  const columns = data.split("\n");

  const ret = { header: [], body: [] };

  ret.header = findGroups(columns.shift(), csvRegexp);
  ret.header.unshift("_id");

  for (let i = 0; i < columns.length; i++) {
    const row = columns[i];
    const ceils = findGroups(row, csvRegexp);
    ceils.unshift(i);
    ret.body.push(ceils);
  }

  return ret;
}

function findGroups(string: string, regexp: RegExp) {
  let matches,
    output = [];
  while ((matches = regexp.exec(string))) {
    output.push(matches[1] || matches[2]);
  }
  return output;
}
