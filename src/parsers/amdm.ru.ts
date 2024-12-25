import type { HTMLElement } from "node-html-parser";
import type { Parser } from "./parce.type";

export const parseAmDmRu: Parser = (body: HTMLElement) => {
  const h1 = body.querySelector('h1')?.textContent.split('\n').at(0)?.replaceAll(',', '');

  const chords = body
    .querySelector('pre')?.textContent.replaceAll(/\<(div|\/div|span|\/span|em|\/em).*?\>/gm, '');

  return {
    chords: chords || "Не найдены аккорды",
    header: h1 || "Не найдено название композиции",
  }
}