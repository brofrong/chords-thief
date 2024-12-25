import { parse, type HTMLElement } from "node-html-parser";
import type { Parser } from "./parsers/parce.type";
import { parseAkkordsPro } from './parsers/akkords.pro';
import { getHostName } from "./utils";

export const AVAILABLE_CITES = ['akkords.pro'] as const;


const parsers: Record<typeof AVAILABLE_CITES[number], Parser> = {
  'akkords.pro': parseAkkordsPro,
}


export async function thiefChordsFromSite(site: string) {
  //get HTML
  const response = await fetch(site);
  const html = await response.text();
  const parsedHTML = parse(html);

  return parseHTML(site, parsedHTML);
}

function parseHTML(site: string, html: HTMLElement) {
  const url = getHostName(site) as typeof AVAILABLE_CITES[number];
  return parsers[url](html);
}
