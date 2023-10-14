import I18N from "./I18N";

const i18n = new I18N({
  localePath: "locales/",
  initLocale: "uk",
  fallbackLocale: "en"
});

i18n.addLocale("en");
i18n.addLocale("uk");

console.log(
  i18n.t("okay.what.about.this.one", { unix: Date.now().toString() })
);

export { I18N };
