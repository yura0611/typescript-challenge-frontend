import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, OnInit, ViewChild } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { GeoJSONSource, Map } from 'maplibre-gl'
import { LINE_PAINT, MARKER_PAINT } from 'src/constants/marker-paint'
import { environment } from 'src/environments/environment'
import { RootState } from 'src/store/app.store'
import { fromTransitLines } from 'src/store/transit-lines/transit-lines.selectors'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { TransitLinesActions } from 'src/store/transit-lines/transit-lines.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  @ViewChild('map', { static: true }) private mapRef: ElementRef<HTMLElement>
  private map: Map

  constructor(
    private store: Store<RootState>,
    private destroyRef: DestroyRef
  ) {
    this.store.dispatch(TransitLinesActions.LoadLines())
  }

  ngOnInit(): void {
    this.map = new Map({
      center: { lat: 52.52, lng: 13.4 },
      zoom: 10,
      container: this.mapRef.nativeElement,
      style: `https://api.maptiler.com/maps/dataviz-light/style.json?key=${environment.maptilerApiKey}`,
    })

    this.map.once('load', () => {
      const stopsSource$ = this.store.pipe(
        select(fromTransitLines.stopsPointGeoJson),
        takeUntilDestroyed(this.destroyRef)
      )

      const linesSource$ = this.store.pipe(select(fromTransitLines.linesGeoJson), takeUntilDestroyed(this.destroyRef))

      const STOPS_SOURCE_ID = 'stops-source'
      const LINES_SOURCE_ID = 'lines-source'

      stopsSource$.subscribe((source) => {
        const exsitingSource = this.map.getSource(STOPS_SOURCE_ID) as GeoJSONSource
        if (exsitingSource) {
          exsitingSource.setData(source.data)
        } else {
          this.map.addSource(STOPS_SOURCE_ID, source)
        }
      })

      linesSource$.subscribe((source) => {
        const existingLinesSource = this.map.getSource(LINES_SOURCE_ID) as GeoJSONSource
        if (existingLinesSource) {
          existingLinesSource.setData(source.data)
        } else {
          this.map.addSource(LINES_SOURCE_ID, source)
        }
      })

      const STOPS_LAYER_ID = 'stops-layer'
      const LINES_LAYER_ID = 'lines-layer'

      this.map.addLayer({ type: 'circle', source: STOPS_SOURCE_ID, id: STOPS_LAYER_ID, paint: MARKER_PAINT })

      this.map.addLayer({ type: 'line', source: LINES_SOURCE_ID, id: LINES_LAYER_ID, paint: LINE_PAINT })

      let stopId: string | number | null = null

      this.map.on('mousemove', STOPS_LAYER_ID, (event) => {
        this.map.getCanvas().style.cursor = 'pointer'

        if (event.features.length === 0) {
          return
        }

        if (stopId) {
          this.map.removeFeatureState({ source: STOPS_SOURCE_ID, id: stopId })
        }

        stopId = event.features[0].id

        this.map.setFeatureState({ source: STOPS_SOURCE_ID, id: stopId }, { hover: true })
      })

      this.map.on('mouseleave', STOPS_LAYER_ID, () => {
        if (stopId) {
          this.map.setFeatureState({ source: STOPS_SOURCE_ID, id: stopId }, { hover: false })
        }

        stopId = null

        this.map.getCanvas().style.cursor = ''
      })

      this.map.on('click', STOPS_LAYER_ID, (e) => {
        const features = this.map.queryRenderedFeatures(e.point, {
          layers: [STOPS_LAYER_ID],
        })

        if (features.length === 0) {
          return
        }

        const selectedStop = features[0]
        this.selectStop(selectedStop.id.toString())
      })
    })
  }

  private selectStop(selectedStopId: string): void {
    this.store.dispatch(TransitLinesActions.SelectStop({ selectedStopId }))
  }
}
