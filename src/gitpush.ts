import { $ } from 'bun';
import { env } from './env';

export async function gitPush(songName: string) {
  await $`cd ${env.PATH_TO_SAVE} && git add . && git commit -m "add ${songName}" && git push`;
}