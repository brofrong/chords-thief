import { } from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';
import { env } from './env';
import type { ParsedChords } from './parsers/parce.type';


// export async function createChordsFolder() {
//   if (await exists(`./${FOLDER_NAME}`)) {
//     return;
//   }
//   await mkdir(`./${FOLDER_NAME}`);
// }

export async function saveChords(chords: ParsedChords, site: string) {
  const filePath = path.join(env.PATH_TO_SAVE, `${chords.header}.md`);
  await writeFile(filePath, mdTemplate(chords, site));
}

export async function updateSitesToParse(success: Set<string>, all: Set<string>) {
  // const newList = all.difference(success).values().reduce((acc, cur) => acc += cur + '\n', '');

  // await writeFile(`./${FILE_TO_PARSE_NAME}`, newList);
}


function mdTemplate(chords: ParsedChords, site: string): string {
  return `# ${chords.header}

\`\`\`chords
${chords.chords}
\`\`\`

src: [${site}](${site})

`
};