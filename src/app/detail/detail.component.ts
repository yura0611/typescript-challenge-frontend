import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { Store } from '@ngrx/store'
import { RootState } from 'src/store/app.store'
import { TransitLinesActions } from 'src/store/transit-lines/transit-lines.actions'
import { fromTransitLines } from 'src/store/transit-lines/transit-lines.selectors'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIconButton, MatIcon],
})
export class DetailComponent {
  readonly stopName: Signal<string>
  readonly stopPeopleOn: Signal<number>
  readonly stopPeopleOff: Signal<number>
  readonly stopReachablePopulationWalk: Signal<number>
  readonly stopReachablePopulationBike: Signal<number>

  constructor(private store: Store<RootState>) {
    const selectedStop = this.store.selectSignal(fromTransitLines.selectedStop)
    this.stopName = computed(() => selectedStop()?.name || 'No selection')
    this.stopPeopleOn = computed(() => selectedStop()?.peopleOn || 0)
    this.stopPeopleOff = computed(() => selectedStop()?.peopleOff || 0)
    this.stopReachablePopulationWalk = computed(() => selectedStop()?.reachablePopulationWalk || 0)
    this.stopReachablePopulationBike = computed(() => selectedStop()?.reachablePopulationBike || 0)
  }

  clearSelection(): void {
    this.store.dispatch(TransitLinesActions.SelectStop({ selectedStopId: null }))
  }
}
