import { ViewContainerRef } from '@angular/core';
import { Appointment } from '../appointments.service';
import { AppointmentModalComponent } from '../modals/appointment-modal/appointment-modal.component';

export function showAppointment(
  appointment: Appointment,
  container: ViewContainerRef
) {
  //Create additional modal effect
  document.body.style.overflowY = 'hidden';
  container.clear();

  const AppointmentModalRef = container.createComponent(
    AppointmentModalComponent
  );

  // Reformat dates for when revising appointments
  let date = new Date(appointment.date.toString() + ' ' + appointment.time);
  const month =
    date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;

  // Pass data to appointment modal attributes
  AppointmentModalRef.instance.appointment = appointment;
  AppointmentModalRef.instance.date = String(
    date.getFullYear() + '-' + month + '-' + date.getDate()
  );
  AppointmentModalRef.instance.time = date
    .toTimeString()
    .toString()
    .slice(0, 8);
  AppointmentModalRef.instance.container = container;
}
