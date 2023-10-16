# DK I18N

This NPM package created for simple and flexible localization of your applications.

# Installation 

```bash
npm install dk-i18n # you can use yarn or pnpm instead
```

# Usage

```ts
import { I18N } from 'simple-i18n';

const i18n = new I18N({
  initLocale: "uk",
  fallbackLocale: "en"
});

i18n.addLocale("en", {
  hello: "Hello, {name}!",
  names: ["John", "Jane", "Joe"]
});

i18n.addLocale("uk", {
  hello: "Привіт, {name}!",
  names: ["Іван", "Іванна", "Іванко"]
});

console.log(i18n.t("hello", {}, { name: "John" })); // Привіт, John!

console.log(i18n.t("names.0")); // Іван

console.log(i18n.t("names"), { json: true }); // you also can get all translations as JSON
```

# API

## `new I18N(options: I18NOptions)`
Creates new instance of I18N class.

```ts
class I18N {
  options: I18NOptions;
  locales: Map<string, Locale>;
  currentLocale: string;
  constructor(options: I18NOptions);
  useLocale(locale: string): void;
  addLocale(name: string, locale: ILocale): void;
  t(key: string, options?: TranslationOptions, values?: TranslationValues): string | string[] | ILocale | undefined;
}
```

## `new Locale (locale: ILocale)`
Creates new instance of Locale class.

```ts
class Locale {
  private locale;
  constructor(locale: ILocale);
  t(key: string, options?: TranslationOptions, values?: TranslationValues): string | string[] | ILocale | undefined;
}
```

## `interface I18NOptions`
```ts
interface I18NOptions {
  initLocale?: string;
  fallbackLocale?: string;
}
```

## `interface ILocale`
```ts
interface ILocale {
  [key: string]: string | string[] | ILocale;
}
```

## `interface TranslationOptions`
```ts
interface TranslationOptions {
  json?: boolean;
}
```

## `interface TranslationValues`
```ts
interface TranslationValues {
  [key: string]: string | number | boolean;
}
```
