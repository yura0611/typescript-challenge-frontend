import { createEntityAdapter, EntityState } from '@ngrx/entity'
import { Action, createReducer, on } from '@ngrx/store'
import { TransitLine } from 'src/types/line'
import { TransitLinesActions } from './transit-lines.actions'

export const TRANSIT_LINES_KEY = 'transit-lines'

export interface TransitLinesState extends EntityState<TransitLine> {
  selectedStopId: string
  loading: boolean
  error: string | null
}

export const transitLinesAdapter = createEntityAdapter<TransitLine>()
export const transitLinesInitialState: TransitLinesState = transitLinesAdapter.getInitialState({
  selectedStopId: null,
  loading: false,
  error: null,
})

const reducer = createReducer(
  transitLinesInitialState,

  on(TransitLinesActions.AddLine, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TransitLinesActions.AddLineSuccess, (state, { line }) =>
    transitLinesAdapter.addOne(line, {
      ...state,
      loading: false,
      error: null,
    })
  ),

  on(TransitLinesActions.AddLineFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TransitLinesActions.LoadLines, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TransitLinesActions.LoadLinesSuccess, (state, { lines }) =>
    transitLinesAdapter.setAll(lines, {
      ...state,
      loading: false,
      error: null,
    })
  ),

  on(TransitLinesActions.LoadLinesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TransitLinesActions.LoadLine, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TransitLinesActions.LoadLineSuccess, (state, { line }) =>
    transitLinesAdapter.addOne(line, {
      ...state,
      loading: false,
      error: null,
    })
  ),

  on(TransitLinesActions.LoadLineFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TransitLinesActions.SelectStop, (state, { selectedStopId }) => ({
    ...state,
    selectedStopId,
  })),

  on(TransitLinesActions.RemoveLine, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TransitLinesActions.RemoveLineSuccess, (state, { lineId }) =>
    transitLinesAdapter.removeOne(lineId, {
      ...state,
      loading: false,
      error: null,
    })
  ),

  on(TransitLinesActions.RemoveLineFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
)

export function transitLinesReducer(state: TransitLinesState | undefined, action: Action): TransitLinesState {
  return reducer(state, action)
}
