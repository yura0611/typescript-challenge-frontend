import { CircleLayerSpecification } from 'maplibre-gl'

export const MARKER_PAINT = {
  'circle-color': ['case', ['boolean', ['feature-state', 'hover'], false], '#007cbf', '#000'],
  'circle-radius': [
    'interpolate',
    ['linear'],
    ['zoom'],
    5,
    ['case', ['boolean', ['feature-state', 'hover'], false], 3, 1],
    15,
    ['case', ['boolean', ['feature-state', 'hover'], false], 12, 8],
  ],
  'circle-stroke-opacity': 1,
  'circle-stroke-color': '#fff',
  'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 5, 0.5, 15, 2],
  'circle-opacity': 1,
} as CircleLayerSpecification['paint']

export const LINE_PAINT = {
  'line-color': '#ff7f50',
  'line-width': 2,
}
