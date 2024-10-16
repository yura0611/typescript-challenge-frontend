import { createAction, props } from '@ngrx/store'
import { TransitLine } from 'src/types/line'

export namespace TransitLinesActions {
  export const AddLine = createAction(`[TRANSIT LINES] Add a line`, props<{ line: TransitLine }>())
  export const AddLineSuccess = createAction(`[TRANSIT LINES] Add a line success`, props<{ line: TransitLine }>())
  export const AddLineFailure = createAction(`[TRANSIT LINES] Add a line failure`, props<{ error: string }>())
  export const LoadLines = createAction(`[TRANSIT LINES] Load lines`)
  export const LoadLinesSuccess = createAction(`[TRANSIT LINES] Load lines success`, props<{ lines: TransitLine[] }>())
  export const LoadLinesFailure = createAction(`[TRANSIT LINES] Load lines failure`, props<{ error: string }>())
  export const LoadLine = createAction(`[TRANSIT LINES] Load a line`, props<{ lineId: string }>())
  export const LoadLineSuccess = createAction(`[TRANSIT LINES] Load a line success`, props<{ line: TransitLine }>())
  export const LoadLineFailure = createAction(`[TRANSIT LINES] Load a line failure`, props<{ error: string }>())
  export const SelectStop = createAction(`[TRANSIT LINES] Select a stop`, props<{ selectedStopId: string }>())
  export const RemoveLine = createAction(`[TRANSIT LINES] Remove a line`, props<{ lineId: string }>())
  export const RemoveLineSuccess = createAction(`[TRANSIT LINES] Remove a line success`, props<{ lineId: string }>())
  export const RemoveLineFailure = createAction(`[TRANSIT LINES] Remove a line failure`, props<{ error: string }>())
}
