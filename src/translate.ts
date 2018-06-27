import { Compute } from "cerebral";
import { state } from "app.cerebral";

export const translate = Compute(get => {
  const lang = get(state.locale.lang);
  const dictionary = get(state.locale.locales[lang]);
  const common = get(state.locale.locales.common);
  return function translate(key: string, mode?: string): string {
    const k = mode ? `${key}${mode}` : key;
    const t = dictionary.hasOwnProperty(k) ? dictionary[k] : common[k];
    if (t === undefined) {
      throw new Error(
        `Missing translation for '${key}${mode ? `, ${mode}` : ""}'.`
      );
    }
    return t;
  };
});
