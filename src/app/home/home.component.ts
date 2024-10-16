import { ChangeDetectionStrategy, Component, Signal } from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatButtonModule } from '@angular/material/button'
import { Store } from '@ngrx/store'
import { RootState } from 'src/store/app.store'
import { TransitLinesActions } from 'src/store/transit-lines/transit-lines.actions'
import { fromTransitLines } from 'src/store/transit-lines/transit-lines.selectors'
import { TransitLine } from 'src/types/line'
import { MatDialog } from '@angular/material/dialog'
import { AddNewLineModalComponent } from '../shared/modals/add-new-line-modal/add-new-line-modal.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIcon, MatProgressSpinnerModule, MatButtonModule],
})
export class HomeComponent {
  readonly lines: Signal<TransitLine[]>
  readonly loading: Signal<boolean>
  readonly error: Signal<string>

  constructor(
    private store: Store<RootState>,
    public dialog: MatDialog
  ) {
    this.lines = this.store.selectSignal(fromTransitLines.selectAll)
    this.loading = this.store.selectSignal(fromTransitLines.loading)
    this.error = this.store.selectSignal(fromTransitLines.error)
  }

  selectStop(selectedStopId: string): void {
    this.store.dispatch(TransitLinesActions.SelectStop({ selectedStopId }))
  }

  addNewLine() {
    const dialog = this.dialog.open(AddNewLineModalComponent, {
      width: 'clamp(0px, 1800px, 100%)',
      maxWidth: '90vw',
    })

    dialog.afterClosed().subscribe((data: TransitLine) => {
      if (data) {
        this.store.dispatch(TransitLinesActions.AddLine({ line: data }))
      }
    })
  }

  onDelete(lineId: string) {
    this.store.dispatch(TransitLinesActions.RemoveLine({ lineId }))
  }
}
