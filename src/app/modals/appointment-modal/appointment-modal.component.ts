import { Component, Input, ViewContainerRef } from '@angular/core';
import { Appointment, AppointmentsService } from 'src/app/appointments.service';
import { Customer, CustomersService } from 'src/app/customers.service';
import { closeAppointment } from 'src/app/shared/closeAppointment';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.css'],
})
export class AppointmentModalComponent {
  @Input() appointment: Appointment | null = null;
  @Input() time: String = '';
  @Input() date: String = '';
  @Input() container!: ViewContainerRef;
  customer: Customer | null = null;
  editAppointment: Boolean = false;
  deleteAppointmentConfirm: Boolean = false;
  createNote: Boolean = false;
  editNote: Boolean = false;
  deleteNoteConfirm: Boolean = false;
  noteID: String = '';
  noteText: String = '';

  ngOnInit() {
    this.CustomersService.getCustomer(
      String(this.appointment?.customerID)
    ).subscribe((data: Customer) => {
      this.customer = { ...data };
    });
  }

  constructor(
    private CustomersService: CustomersService,
    private AppointmentsService: AppointmentsService
  ) {}

  getCustomer() {
    this.CustomersService.getCustomer(
      String(this.appointment?.customerID)
    ).subscribe((data: Customer) => {
      this.customer = { ...data };
    });
  }

  close() {
    closeAppointment(this.container);
  }

  updateAppointment() {
    let date = (<HTMLInputElement>document.getElementById('appointment-date'))
      .value;
    let time = (<HTMLInputElement>document.getElementById('appointment-time'))
      .value;
    let updatedInfo = {
      type: (<HTMLInputElement>document.getElementById('appointment-type'))
        .value,
      date: date.slice(5, 7) + '/' + date.slice(8) + '/' + date.slice(0, 4),
      time: time.slice(0, 5),
    };

    this.AppointmentsService.updateAppointment(
      String(this.appointment?._id),
      updatedInfo
    ).subscribe((data) => {
      window.location.reload();
    });
  }

  deleteAppointment() {
    this.AppointmentsService.deleteAppointment(
      String(this.appointment?._id)
    ).subscribe((data: any) => {
      window.location.reload();
    });
  }

  openCreateNote() {
    this.editNote = false;
    this.createNote = true;
  }

  addNote() {
    const newNote = (<HTMLInputElement>document.getElementById('add-note'))
      .value;
    this.AppointmentsService.addNote(
      String(this.appointment?._id),
      newNote
    ).subscribe((data: any) => {
      window.location.reload();
    });
  }

  openEditNote(text: String, selectedID: String) {
    this.createNote = false;
    this.editNote = true;
    this.noteID = selectedID;
    this.noteText = text;
  }

  updateNote() {
    const updatedNote = (<HTMLInputElement>(
      document.getElementById(this.noteID.toString())
    )).value;
    if (updatedNote !== this.noteText) {
      this.AppointmentsService.updateNote(
        String(this.appointment?._id),
        this.noteID,
        updatedNote
      ).subscribe((data: any) => window.location.reload());
    } else {
      alert('Attempting to update note with no changes');
    }
  }

  deleteNoteConfirmation(selectedID: String) {
    this.deleteNoteConfirm = true;
    this.noteID = selectedID;
  }

  deleteNote() {
    this.AppointmentsService.deleteNote(
      String(this.appointment?._id),
      this.noteID
    ).subscribe((data: any) => window.location.reload());
  }
}
