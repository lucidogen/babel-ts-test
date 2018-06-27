import { runCompute } from 'cerebral/test'
import { describe, expect, it } from 'test'

import { translate } from './translate'

describe('translate', () => {
  it('should insert hooks in sequences', () => {
    const result = runCompute(translate, {
      state: { locale: { lang: 'fr', locales: { fr: { foo: 'le fou' } } } },
      props: {},
    })
    expect(typeof result).toBe('function')
  })
})
