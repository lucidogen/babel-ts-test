import * as cerebral from 'cerebral'

import { LocaleSequences, LocaleState } from './types'

export type Context = cerebral.IContext<{}>
export const state = cerebral.state as LocaleState
export const sequences = cerebral.sequences as LocaleSequences
export const props = cerebral.props
