import { readFile } from 'fs/promises';
import { checkSite } from './src/guard';
import { thiefChordsFromSite } from './src/thief';
import { createChordsFolder, saveChords, updateSitesToParse } from './src/save-chords';

export const FOLDER_NAME = 'chords';
export const FILE_TO_PARSE_NAME = 'sites-to-parse.txt';

await createChordsFolder()

const toParse = (await readFile(`./${FILE_TO_PARSE_NAME}`)).toString().split('\n').filter(it => it.length > 0);
const successFullParsed = new Set<string>();

if (toParse.length === 0) {
  console.error(`${FILE_TO_PARSE_NAME} is empty`);
}

for (const site of toParse) {
  if (!checkSite(site)) continue;
  const parsedValues = await thiefChordsFromSite(site);
  console.log(`parsed: ${parsedValues.header}`);
  await saveChords(parsedValues, site);
  successFullParsed.add(site);
}

console.log(`successfully parsed ${successFullParsed.size}`);
await updateSitesToParse(successFullParsed, new Set(toParse));

