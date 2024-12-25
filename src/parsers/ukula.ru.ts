import type { HTMLElement } from "node-html-parser";
import type { Parser } from "./parce.type";

export const parseUkulaRu: Parser = (body: HTMLElement) => {

  const h1 = body.querySelector('p.black.blackColor')?.textContent?.replaceAll('\n', '').replaceAll('\t', '');
  console.log(body.toString());
  console.log(body.querySelector('p.black.blackColor')?.textContent);
  const chords = body
    .querySelector('pre')?.textContent.replaceAll(/\<(div|\/div|span|\/span|em|\/em).*?\>/gm, '');

  return {
    chords: chords || "Не найдены аккорды",
    header: h1 || "Не найдено название композиции",
  }
}