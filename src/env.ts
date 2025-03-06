import { env as bunEnv } from "bun";
import fs from 'fs';
import { z } from "zod";

const envSchema = z.object({
  TELEGRAM_BOT_TOKEN: z.string(),
  PATH_TO_SAVE: z.custom((data) => fs.existsSync(data)),
  TELEGRAM_ADMIN_ID: z.string(),
})

export const env = envSchema.parse(bunEnv);
