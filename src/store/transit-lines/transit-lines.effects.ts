import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap, switchMap } from 'rxjs/operators'
import { TransitLinesActions } from './transit-lines.actions'
import { TransitLinesService } from 'src/services/transit-lines.service'
import { of, catchError } from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http'
import { SnackbarService } from 'src/services/snackbar.service'

@Injectable()
export class TransitLinesEffects {
  addLine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransitLinesActions.AddLine),
      mergeMap((action) => {
        return this.transitLinesService.addLine(action.line).pipe(
          map((line) => TransitLinesActions.AddLineSuccess({ line })),
          catchError((error: HttpErrorResponse) => {
            this.snackbarService.show(error.error.message)
            return of(TransitLinesActions.AddLineFailure({ error: error.error.message }))
          })
        )
      })
    )
  )

  loadLines$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransitLinesActions.LoadLines),
      switchMap(() =>
        this.transitLinesService.getLines().pipe(
          map((lines) => TransitLinesActions.LoadLinesSuccess({ lines })),
          catchError((error: HttpErrorResponse) => {
            this.snackbarService.show(error.error.message)
            return of(TransitLinesActions.AddLineFailure({ error: error.error.message }))
          })
        )
      )
    )
  )

  loadLine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransitLinesActions.LoadLine),
      mergeMap((action) =>
        this.transitLinesService.getLine(action.lineId).pipe(
          map((line) => TransitLinesActions.LoadLineSuccess({ line })),
          catchError((error: HttpErrorResponse) => {
            this.snackbarService.show(error.error.message)
            return of(TransitLinesActions.AddLineFailure({ error: error.error.message }))
          })
        )
      )
    )
  )

  navigateOnSelect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TransitLinesActions.SelectStop),
        map((action) => (action.selectedStopId ? this.router.navigate(['detail']) : this.router.navigate(['home'])))
      ),
    { dispatch: false }
  )

  removeLine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransitLinesActions.RemoveLine),
      mergeMap((action) =>
        this.transitLinesService.removeLine(action.lineId).pipe(
          map(() => TransitLinesActions.RemoveLineSuccess({ lineId: action.lineId })),
          catchError((error: HttpErrorResponse) => {
            this.snackbarService.show(error.error.message)
            return of(TransitLinesActions.RemoveLineFailure({ error: error.error.message }))
          })
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private router: Router,
    private transitLinesService: TransitLinesService,
    private snackbarService: SnackbarService
  ) {}
}
