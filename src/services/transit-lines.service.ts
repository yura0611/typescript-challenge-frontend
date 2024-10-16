import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { API_URL } from 'src/tokens/api-url.token'
import { TransitLine } from 'src/types/line'

@Injectable({
  providedIn: 'root',
})
export class TransitLinesService {
  constructor(
    @Inject(API_URL) private apiUrl: string,
    private httpClient: HttpClient
  ) {}

  addLine(line: TransitLine): Observable<TransitLine> {
    return this.httpClient.post<TransitLine>(`${this.apiUrl}/transit-lines`, line)
  }

  getLines(): Observable<TransitLine[]> {
    return this.httpClient.get<TransitLine[]>(`${this.apiUrl}/transit-lines`)
  }

  getLine(lineId: string): Observable<TransitLine> {
    return this.httpClient.get<TransitLine>(`${this.apiUrl}/transit-lines/${lineId}`)
  }

  removeLine(lineId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/transit-lines/${lineId}`)
  }
}
