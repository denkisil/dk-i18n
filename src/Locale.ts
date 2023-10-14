interface ILocale {
  [key: string]: string | ILocale;
}

export default class Locale {
  constructor(public locale: ILocale) {}

  t(key: string, values: { [key: number | string]: string }): string {
    const keys = key.split(".");
    let locale = this.locale;

    for (const k of keys) {
      if (typeof locale[k] === "string") {
        /* parse statements like "hello {name}" */

        return (locale[k] as string).replace(
          /{(\w+)}/g,
          (match, p1) => values[p1] || match
        );
      } else if (typeof locale[k] === "object") {
        locale = locale[k] as ILocale;
      } else {
        return "";
      }
    }

    return "";
  }
}
