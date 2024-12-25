import type { HTMLElement } from "node-html-parser";
import type { Parser } from "./parce.type";

export const parseAkkordsPro: Parser = (body: HTMLElement) => {
  const h1 = body.querySelector('h1')?.text.split(':').at(0);

  const chords = body
    .querySelector('.chords')?.text
    .replaceAll('<b>', '[')
    .replaceAll('</b>', ']')
    .replaceAll(/\<(p|\/p|span|\/span).*?\>/gm, '')
    .replaceAll('\n\n', '\n');

  return {
    chords: chords || "Не найдены аккорды",
    header: h1 || "Не найдено название композиции",
  }
}