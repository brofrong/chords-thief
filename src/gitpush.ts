import { $ } from 'bun';
import { env } from './env';

export async function gitPush(songName: string) {
  try {
    await $`cd ${env.PATH_TO_SAVE} && git pull && git add . && git commit -m "add ${songName}" && git push`.text();
    return { err: null }
  } catch (err) {
    return { err: `failed git push: ${JSON.stringify(err)}` }
  }

}