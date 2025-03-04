import * as fs from 'fs/promises';
import path from 'path';
import { env } from './env';
import type { ParsedChords } from './parsers/parce.type';



async function pathToSave(fileName: string) {
  const basicName = path.join(env.PATH_TO_SAVE, `${fileName}`);
  let name = `${basicName}.md`;
  let nameTry = 1;

  while ((await fs.exists(name))) {
    name = basicName + ` (${nameTry}).md`;
    nameTry++;
  }

  return name;
}

export async function saveChords(chords: ParsedChords, site: string) {
  const filePath = await pathToSave(chords.header);
  console.log(filePath);
  await fs.writeFile(filePath, mdTemplate(chords, site));
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