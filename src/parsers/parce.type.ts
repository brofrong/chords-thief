import type { HTMLElement } from "node-html-parser";


export type ParsedChords = { header: string, chords: string };

export type Parser = (body: HTMLElement) => ParsedChords;

