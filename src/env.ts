import { z } from "zod"
import { env as bunEnv } from "bun";
import fs from 'fs';
import path from 'path';

const envSchema = z.object({
  TELEGRAM_BOT_TOKEN: z.string(),
  PATH_TO_SAVE: z.custom((data) => fs.existsSync(data)),
})

export const env = envSchema.parse(bunEnv);
