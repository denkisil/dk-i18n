import Locale, {
  ILocale,
  TranslationOptions,
  TranslationValues
} from "./Locale";

export interface I18NOptions {
  initLocale?: string;
  fallbackLocale?: string;
}

export default class I18N {
  public locales: Map<string, Locale> = new Map();
  public currentLocale: string = this.options.initLocale || "";
  constructor(public options: I18NOptions) {}

  useLocale(locale: string) {
    if (!this.locales.has(locale)) {
      if (!this.locales.has(this.options.fallbackLocale!)) {
        throw new Error("ERROR! Fallback locale not found");
      }

      this.currentLocale = this.options.fallbackLocale!;
    } else {
      this.currentLocale = locale;
    }
  }

  addLocale(name: string, locale: ILocale) {
    if (this.locales.has(name)) return;

    this.locales.set(name, new Locale(locale));
  }

  t(
    key: string,
    options?: TranslationOptions,
    values?: TranslationValues
  ): string | string[] | ILocale | ILocale[] | undefined {
    if (!this.locales.has(this.currentLocale)) {
      console.log(
        "ERROR! Initial or set locale not found. Trying to use fallback locale"
      );

      this.useLocale(this.options.fallbackLocale!);
    }

    return this.locales
      .get(this.currentLocale)!
      .t(key, options || {}, values || {});
  }
}
