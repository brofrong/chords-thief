import { parse, type HTMLElement } from "node-html-parser";
import { parseAkkordsPro } from './parsers/akkords.pro';
import { parseAmDmRu } from './parsers/amdm.ru';
import type { Parser } from "./parsers/parce.type";
import { getHostName } from "./utils";

export const AVAILABLE_CITES = ['akkords.pro', 'amdm.ru', '536.amdm.ru', 'guitarflow.ru', 'www.5lad.ru'] as const;


const parsers: Record<typeof AVAILABLE_CITES[number], Parser> = {
  'akkords.pro': parseAkkordsPro,
  'amdm.ru': parseAmDmRu,
  '536.amdm.ru': parseAmDmRu,
  'guitarflow.ru': parseAkkordsPro,
  'www.5lad.ru': parseAmDmRu,
  // 'ukula.ru': parseUkulaRu,
}


export async function thiefChordsFromSite(site: string) {
  //get HTML
  console.info('start fetching');
  const response = await fetch(site);
  console.info('success full fetched');
  const html = await response.text();
  const parsedHTML = parse(html);

  return parseHTML(site, parsedHTML);
}

function parseHTML(site: string, html: HTMLElement) {
  const url = getHostName(site) as typeof AVAILABLE_CITES[number];
  return parsers[url](html);
}
