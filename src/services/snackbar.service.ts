import { inject, Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbar = inject(MatSnackBar)

  show(message: string): void {
    this.snackbar.open(message, 'Close', {
      duration: 3000,
    })
  }
}
