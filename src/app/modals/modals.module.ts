import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AppointmentModalComponent } from './appointment-modal/appointment-modal.component';
import { DayModalComponent } from './day-modal/day-modal.component';

@NgModule({
  declarations: [AppointmentModalComponent, DayModalComponent],
  imports: [CommonModule, SharedModule],
  exports: [AppointmentModalComponent, DayModalComponent],
  bootstrap: [AppointmentModalComponent, DayModalComponent],
})
export class ModalsModule {}
