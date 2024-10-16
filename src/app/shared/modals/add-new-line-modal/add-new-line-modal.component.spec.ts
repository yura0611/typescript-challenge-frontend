import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewLineModalComponent } from './add-new-line-modal.component';

describe('AddNewLineModalComponent', () => {
  let component: AddNewLineModalComponent;
  let fixture: ComponentFixture<AddNewLineModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewLineModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewLineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
