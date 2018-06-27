import { Block, Builder, CerebralModules } from '@lucidogen/builder'

import * as sequences from './sequences'
import { translate } from './translate'
import { LocaleBlock, Locales } from './types'

export * from './types'

function parseLocales(builder: Builder<LocaleBlock>): CerebralModules {
  // Extract all 'locale' fields with translations.
  const locales: Locales = {}
  builder.blocks.forEach(block => {
    if (block.locale) {
      const dictionaries = builder.resolve(block.locale)
      Object.keys(dictionaries).forEach(lang => {
        if (!locales[lang]) {
          locales[lang] = {}
        }
        // Last defined translation for conflicting keys wins.
        Object.assign(locales[lang], dictionaries[lang])
      })
    }
  })

  return {
    locale: {
      sequences,
      state: {
        lang: 'en',
        locales,
        translate,
      },
    },
  }
}

export const locale: Block = {
  name: 'locale',
  modules: parseLocales,
}
