import { Row } from "./supabase/types";

export enum EnumCaseType {
  TO_SNAKE = "camelCase",
  TO_CAMEL = "snake_case"
}

export default function parseKeys(data: Row, type: EnumCaseType): Row {
  const entries = Object.entries(data);
  return Object.fromEntries(entries.map(entry => {
    let key = entry[0];
    let value = entry[1];

    if (/^table_.+/.test(key)) {
      value = value.map(e => parseKeys(e, type));
    }

    if (type === EnumCaseType.TO_CAMEL) {
      key = key.replace(/_+(\w)/g, (letter) => letter[1].toUpperCase());
    } else if (type === EnumCaseType.TO_SNAKE) {
      key = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    }
    return [key, value];
  }));
}