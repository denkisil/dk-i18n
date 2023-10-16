export interface ILocale {
  [key: string]: string | ILocale;
}

export interface TranslationValues {
  [key: number | string]: string;
}

export default class Locale {
  constructor(private locale: ILocale) {}

  t(key: string, values: TranslationValues): string | undefined {
    const keys = key.split(".");
    let locale = this.locale;

    for (const k of keys) {
      if (typeof locale[k] === "string") {
        return (locale[k] as string).replace(
          /{(\w+)}/g,
          (match, p1) => values[p1] || match
        );
      } else if (typeof locale[k] === "object") {
        locale = locale[k] as ILocale;
      } else {
        return;
      }
    }

    return;
  }
}
