import { Block, build } from '@lucidogen/builder'
import { Context, state } from 'app.cerebral'
import { CerebralTest } from 'cerebral/test'
import { describe, expect, it } from 'test'

import { LocaleBlock, locale } from './'

const foo: Block<LocaleBlock> = {
  name: 'foo',
  locale: {
    fr: { foo: 'le fou' },
    en: { foo: 'foobar' },
  },
  modules: { foo: {} },
}

const bar: Block<LocaleBlock> = {
  name: 'bar',
  locale: {
    fr: { bar: 'le bar' },
    en: { bar: 'barman' },
  },
  modules: { foo: {} },
}

describe('build', () => {
  it('parse all locales', () => {
    const app = {
      name: 'app',
      modules: {
        app: {
          sequences: {
            test: [
              ({ get }: Context) => {
                const locales = get(state.locale.locales)
                return { locales }
              },
            ],
          },
        },
      },
    }
    const root = build(app, locale, foo, bar)
    const test = CerebralTest(root)
    return test.runSequence('app.test', {}).then(output => {
      expect(output['0']).toEqual({
        output: {
          hooked: false,
        },
        props: {
          foo: 'hooked',
          hooked: true,
        },
      })
    })
  })
})
