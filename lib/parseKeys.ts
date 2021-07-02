export enum EnumCaseType {
  TO_SNAKE = "camelCase",
  TO_CAMEL = "snake_case"
}

type TypeObject = {
  [name: string]: any
}

export default function parseKeys(data: TypeObject | TypeObject[], type: EnumCaseType): TypeObject | TypeObject[] {
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      data[i] = parseKeys(data[i], type);
    }
    return data;
  }

  const entries = Object.entries(data);
  return Object.fromEntries(entries.map(entry => {
    let key = entry[0];
    let value = entry[1];

    if (/^table_.+/.test(key)) {
      value = parseKeys(value, type);
    }

    if (type === EnumCaseType.TO_CAMEL) {
      key = key.replace(/_+(\w)/g, (letter) => letter[1].toUpperCase());
    } else if (type === EnumCaseType.TO_SNAKE) {
      key = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    }
    return [key, value];
  }));
}