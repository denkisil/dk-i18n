export interface ILocale {
  [key: string]: string | string[] | ILocale | ILocale[];
}

export interface TranslationValues {
  [key: number | string]: string | number | boolean;
}

export interface TranslationOptions {
  json?: boolean;
}

export default class Locale {
  constructor(private locale: ILocale) {}

  t(
    key: string,
    options?: TranslationOptions,
    values?: TranslationValues
  ): string | string[] | ILocale | ILocale[] | undefined {
    const keys = key.split(".");
    let locale = this.locale;

    for (const k of keys) {
      if (typeof locale[k] === "string") {
        if (values != null)
          return (locale[k] as string).replace(
            /{(\w+)}/g,
            (match, p1) => values[p1].toString() || match
          );
        else return locale[k];
      } else if (typeof locale[k] === "object") {
        if (options?.json && keys[keys.length - 1] === k) {
          return locale[k];
        }

        locale = locale[k] as ILocale;
      } else {
        return;
      }
    }

    return;
  }
}
