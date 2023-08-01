import { Component, Input, ViewContainerRef } from '@angular/core';
import { Appointment, AppointmentsService } from 'src/app/appointments.service';
import { showAppointment } from 'src/app/shared/showAppointment';
import { Customer, CustomersService } from 'src/app/customers.service';

@Component({
  selector: 'app-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.css'],
})
export class DayModalComponent {
  @Input() container!: ViewContainerRef;
  @Input() appointments: Appointment[] | null = null;
  @Input() date: String = '';
  customers: Customer[] = [];
  addAppointment: Boolean = false;

  constructor(
    private CustomersService: CustomersService,
    private AppointmentsService: AppointmentsService
  ) {}

  ngOnInit() {
    this.CustomersService.customers.subscribe(
      (data) => (this.customers = [...data])
    );
  }

  submitAppointment() {
    const [customerID, customer] = (<HTMLInputElement>(
      document.getElementById('customer')
    )).value.split(',');
    let time = (<HTMLInputElement>document.getElementById('time')).value;
    let newAppointment = {
      date: this.date,
      time: time.slice(0, 5),
      customerID: customerID,
      customer: customer,
      type: (<HTMLInputElement>document.getElementById('type')).value,
      notes: [],
    };

    if (newAppointment.time.length === 0) {
      alert('A time needs to be entered');
      return;
    } else {
      this.AppointmentsService.addAppointment(newAppointment).subscribe(
        (data) => {
          window.location.reload();
        }
      );
    }
  }

  appointmentClicked(appointment: Appointment) {
    showAppointment(appointment, this.container);
  }

  close() {
    document.body.style.overflowY = 'auto';
    this.container.clear();
  }
}
