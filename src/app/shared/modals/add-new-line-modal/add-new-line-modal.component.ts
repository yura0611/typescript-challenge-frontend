import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatFormField } from '@angular/material/form-field'
import { MatButton } from '@angular/material/button'
import { MatInput } from '@angular/material/input'
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { v4 } from 'uuid'
import { MatIcon } from '@angular/material/icon'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-add-new-line-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    MatDialogActions,
    MatButton,
    MatInput,
    ReactiveFormsModule,
    MatDialogTitle,
    MatFormFieldModule,
    MatDialogClose,
    MatIcon,
    NgIf,
  ],
  templateUrl: './add-new-line-modal.component.html',
  styleUrl: './add-new-line-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewLineModalComponent {
  private formBuilder = inject(FormBuilder)
  private dialogRef = inject(MatDialogRef<AddNewLineModalComponent>)

  lineForm: FormGroup

  controlsArray = [
    { name: 'name', type: 'text', label: 'Stop Name' },
    { name: 'lat', type: 'number', label: 'Latitude' },
    { name: 'lng', type: 'number', label: 'Longitude' },
    { name: 'peopleOn', type: 'number', label: 'People On' },
    { name: 'peopleOff', type: 'number', label: 'People Off' },
    { name: 'reachablePopulationWalk', type: 'number', label: 'Population Walk' },
    { name: 'reachablePopulationBike', type: 'number', label: 'Population Bike' },
  ]

  constructor() {
    this.lineForm = this.formBuilder.group({
      id: ['', Validators.required],
      stops: this.formBuilder.array([]),
    })
  }

  get stops(): FormArray {
    return this.lineForm.get('stops') as FormArray
  }

  get stopsControls(): AbstractControl[] {
    return this.stops.controls
  }

  getFormGroupAtIndex(index: number) {
    return this.stopsControls[index] as FormGroup
  }

  addStop() {
    const stop = this.formBuilder.group({
      name: [null, Validators.required],
      id: [v4(), Validators.required],
      lat: [null, Validators.required],
      lng: [null, Validators.required],
      prevId: [null],
      nextId: [null],
      peopleOn: [null, Validators.required],
      peopleOff: [null, Validators.required],
      reachablePopulationWalk: [null, Validators.required],
      reachablePopulationBike: [null, Validators.required],
    })

    this.stops.push(stop)

    if (this.stops.length > 1) {
      const previousStop = this.stops.at(this.stops.length - 2)

      const newStopId = stop.get('id')?.value
      previousStop.get('nextId')?.patchValue(newStopId)

      const previousStopId = previousStop.get('id')?.value
      stop.get('prevId')?.patchValue(previousStopId)
    }
  }

  onSubmit() {
    if (!this.lineForm.valid) {
      return
    }

    const { id, stops } = this.lineForm.getRawValue()

    this.dialogRef.close({
      id,
      stops,
    })
  }

  removeStop(index: number) {
    this.stops.removeAt(index)

    if (this.stops.length > 0) {
      if (index === 0) {
        const nextStop = this.stops.at(0)
        nextStop.get('prevId')?.patchValue(null)
      } else if (index === this.stops.length) {
        const previousStop = this.stops.at(index - 1)
        previousStop.get('nextId')?.patchValue(null)
      } else {
        const previousStop = this.stops.at(index - 1)
        const nextStop = this.stops.at(index)

        const previousStopId = previousStop.get('id')?.value
        const nextStopId = nextStop.get('id')?.value

        previousStop.get('nextId')?.patchValue(nextStopId)
        nextStop.get('prevId')?.patchValue(previousStopId)
      }
    }
  }
}
