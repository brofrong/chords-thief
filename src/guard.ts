import { AVAILABLE_CITES } from "./thief";
import { getHostName } from './utils';


export function checkSite(site: string): boolean {
  const hostname = getHostName(site);
  const canParse = AVAILABLE_CITES.includes(hostname as any);

  if (!canParse) { console.error(`Don't know how to parse ${site}`) };

  return canParse;
}