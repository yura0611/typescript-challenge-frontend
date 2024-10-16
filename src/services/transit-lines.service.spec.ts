import { TestBed } from '@angular/core/testing'

import { TransitLinesService } from './transit-lines.service'

describe('TransitLinesService', () => {
  let service: TransitLinesService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(TransitLinesService)
  })

  test('should be created', () => {
    expect(service).toBeTruthy()
  })
})
