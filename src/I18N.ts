import * as path from "path";
import * as fs from "fs";
import Locale, { TranslationValues } from "./Locale";

export interface I18NOptions {
  initLocale?: string;
  fallbackLocale: string;
  localePath: string;
}

export default class I18N {
  public locales: Map<string, Locale> = new Map();
  public currentLocale: string = this.options.initLocale || "";
  constructor(public options: I18NOptions) {}

  useLocale(locale: string) {
    if (!this.locales.has(locale)) {
      console.log("ERROR! Locale not found. Using fallback locale");
      this.currentLocale = this.options.fallbackLocale;
    } else {
      this.currentLocale = locale;
    }
  }

  addLocale(newLocale: string) {
    const localePath = path.join(this.options.localePath!, `${newLocale}.json`);

    if (Object.keys(this.locales).includes(newLocale)) {
      return;
    }

    if (!fs.existsSync(localePath)) {
      throw new Error(`Locale file ${localePath} not found`);
    }

    const localeData = fs.readFileSync(localePath, "utf8");

    this.locales.set(newLocale, new Locale(JSON.parse(localeData)));
  }

  t(key: string, values?: TranslationValues): string | undefined {
    return this.locales.get(this.currentLocale)!.t(key, values || {});
  }
}
