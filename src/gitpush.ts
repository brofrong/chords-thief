import { $ } from 'bun';
import { env } from './env';

async function gitPush() {
  await $`cd ${env.PATH_TO_SAVE}`;
  await $`git add .`;
  await $`git commit -m "saving from bun"`;
  await $`git push`;
}

gitPush();