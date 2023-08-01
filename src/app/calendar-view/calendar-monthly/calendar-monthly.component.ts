import {
  Component,
  ViewEncapsulation,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { Subject } from 'rxjs';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { EventColor } from 'calendar-utils';

import { Appointment, AppointmentsService } from 'src/app/appointments.service';
import { DayModalComponent } from '../../modals/day-modal/day-modal.component';

const appointmentTypes: Record<string, EventColor> = {
  yoga: { primary: 'violet', secondary: 'orange' },
  cooking: { primary: 'green', secondary: 'yellow' },
  workout: { primary: 'orange', secondary: 'red' },
  'martial arts': { primary: 'red', secondary: 'black' },
};

@Component({
  selector: 'app-calendar-monthly',
  templateUrl: './calendar-monthly.component.html',
  styleUrls: ['./calendar-monthly.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarMonthlyComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  refresh = new Subject<void>();

  appointments: Appointment[] = [];
  appointmentPins: CalendarEvent[] = [];
  selectedDate: String = '';
  selectedDateAppointments: Appointment[] = [];

  ngOnInit() {
    this.AppointmentsService.appointments.subscribe(
      (data) => (this.appointments = [...data])
    );

    this.AppointmentsService.getAppointments().subscribe(
      (data: Appointment[]) => {
        data.forEach((appointment, _) => {
          this.appointmentPins.push({
            id: appointment._id.toString(),
            start: new Date(
              appointment.date.toString() + ' ' + appointment.time.toString()
            ),
            title: appointment.type.toString(),
            color: appointmentTypes[appointment.type.toString()],
          });
        });
        this.refresh.next();
      }
    );
  }

  constructor(private AppointmentsService: AppointmentsService) {}

  monthsFull: String[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  monthsShort: String[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  showDateHeader(options: String): String {
    let year = this.viewDate.getFullYear();
    let month = this.viewDate.getMonth();
    let date = this.viewDate.getDate();
    let day = this.viewDate.getDay();

    switch (options) {
      case 'month':
        return String(this.monthsFull[month] + ' ' + year);
      case 'week':
        return String(this.monthsFull[month] + ' ' + year + ', ' + date);
      case 'day':
        return String(day);
    }

    return 'Option not found';
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }) {
    this.container.clear();
    this.selectedDate = new Date(date).toLocaleDateString('en-US');
    this.selectedDateAppointments = this.appointments.filter(
      (appointment) => appointment.date === this.selectedDate
    );

    document.body.style.overflowY = 'hidden';
    const DayModalRef = this.container.createComponent(DayModalComponent);
    DayModalRef.instance.appointments = this.selectedDateAppointments;
    DayModalRef.instance.date = this.selectedDate;
    DayModalRef.instance.container = this.container;
  }

  checkExpiration(appointment: string) {
    const currAppointment = Date.parse(appointment);
    const today = Date.parse(this.viewDate.toLocaleDateString('en-US'));
    if (currAppointment < today) {
      return '#d13c01';
    } else if (currAppointment === today) {
      return '#70d101';
    } else {
      return '#1a68c2';
    }
  }
}
