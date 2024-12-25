import type { ParsedChords } from './parsers/parce.type';
import { exists, writeFile, mkdir } from 'fs/promises';
import { FOLDER_NAME, FILE_TO_PARSE_NAME } from '../index';
import { } from 'fs';
import path from 'path';


export async function createChordsFolder() {
  if (await exists(`./${FOLDER_NAME}`)) {
    return;
  }
  await mkdir(`./${FOLDER_NAME}`);
}

export async function saveChords(chords: ParsedChords) {
  const filePath = path.join(FOLDER_NAME, `${chords.header}.md`);
  await writeFile(filePath, mdTemplate(chords));
}

export async function updateSitesToParse(success: Set<string>, all: Set<string>) {
  const newList = all.difference(success).values().reduce((acc, cur) => acc += cur + '\n', '');

  await writeFile(`./${FILE_TO_PARSE_NAME}`, newList);
}


function mdTemplate(chords: ParsedChords): string {
  return `# ${chords.header}

\`\`\`chords
${chords.chords}
\`\`\`
`
};