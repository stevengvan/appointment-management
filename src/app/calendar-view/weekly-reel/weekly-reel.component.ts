import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import format from 'date-fns/format';
import { parse } from 'date-fns';
import { Appointment, AppointmentsService } from 'src/app/appointments.service';
import { showAppointment } from 'src/app/shared/showAppointment';

@Component({
  selector: 'app-weekly-reel',
  templateUrl: './weekly-reel.component.html',
  styleUrls: ['./weekly-reel.component.css'],
})
export class WeeklyReelComponent {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  appointments: Appointment[] = [];
  appointmentsWeekly: Appointment[] = [];
  today: Date = new Date();
  currentWeek: Date = new Date();

  ngOnInit() {
    this.AppointmentsService.getAppointments().subscribe(
      (data: Appointment[]) => {
        this.appointments = data.sort(function (
          apptA: Appointment,
          apptB: Appointment
        ) {
          return (
            Date.parse(apptA.date.toString() + ' ' + apptA.time.toString()) -
            Date.parse(apptB.date.toString() + ' ' + apptB.time.toString())
          );
        });

        let currDate = new Date();
        const firstDayOfWeek = new Date(
          currDate.setDate(this.today.getDate() - this.today.getDay())
        );
        for (let appointment of this.appointments) {
          appointment.time = format(
            parse(appointment.time.toString(), 'HH:mm', new Date()),
            'hh:mm a'
          );
          currDate = new Date(appointment.date.toString());
          let dateDiff = currDate.getDate() - firstDayOfWeek.getDate();
          if (
            dateDiff >= 0 &&
            dateDiff <= 6 &&
            currDate.getMonth() === this.today.getMonth()
          ) {
            this.appointmentsWeekly.push(appointment);
          }
        }
      }
    );
  }
  constructor(private AppointmentsService: AppointmentsService) {}

  appointmentClicked(appointment: Appointment) {
    console.log(this.today);
    showAppointment(appointment, this.container);
  }

  checkExpiration(appointment: string) {
    const currAppointment = Date.parse(appointment);
    const today = Date.parse(this.today.toLocaleDateString('en-US'));
    if (currAppointment < today) {
      return '#d13c01';
    } else if (currAppointment === today) {
      return '#70d101';
    } else {
      return '#1a68c2';
    }
  }
}
