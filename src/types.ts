export interface Locales {
  [lang: string]: {
    [keyAndScope: string]: string
  }
}

export interface LocaleState {
  locale: {
    // Currently selected lang
    lang: string
    // PRIVATE
    locales: Locales
    // Compute: returns a function to translate a string using current lang.
    translate(key: string, scope?: string): string
  }
}

export interface LocaleSequences {
  locale: {
    set(args: { lang: string }): void
  }
}

export interface LocaleBlock {
  // Declare translations here:
  locale?: Locales
}
