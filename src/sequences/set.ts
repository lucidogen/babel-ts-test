import { Context, props, state } from 'app.cerebral'
import { sequence, set as setState } from 'cerebral/factories'
import * as moment from 'moment'

const LANG_TO_LOCALE: { [key: string]: string } = {
  fr: 'fr-ch',
  en: 'en-gb',
}

export function setMomentLocale({ get, store }: Context) {
  const lang = get(state.locale.lang) || 'en'
  moment.locale(LANG_TO_LOCALE[lang] || lang)
}

export const set = sequence<{ lang: string }>([
  setState(state.locale.lang, props.filter),
  setMomentLocale,
])
