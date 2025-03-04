import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { env } from './src/env';
import { checkSite } from './src/guard';
import { saveChords } from './src/save-chords';
import { AVAILABLE_CITES, thiefChordsFromSite } from './src/thief';
import { gitPush } from './src/gitpush';

export const FILE_TO_PARSE_NAME = 'sites-to-parse.txt';

const bot = new Telegraf(env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => ctx.reply(`Отправь мне ссылку на один из следующих ресурсов \n ${AVAILABLE_CITES.join('\n')}`));


bot.on(message('text'), async (ctx) => {
  const links = ctx.text;
  for (const site of links.split('\n')) {
    if (!checkSite(site)) {
      ctx.reply(`${site} - нельзя обработать`);
      continue;
    };
    const parsedValues = await thiefChordsFromSite(site);
    await saveChords(parsedValues, site);
    await gitPush(parsedValues.header);
    ctx.reply(`parsed: ${parsedValues.header}\n${parsedValues.chords}`);
  }
}
);


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

bot.launch();
console.log('TELEGRAM BOT STARTED');

