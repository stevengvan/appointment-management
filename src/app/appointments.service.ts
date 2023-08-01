import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface Appointment {
  _id: String;
  date: String;
  customerID: String;
  customer: String;
  type: String;
  time: String;
  notes: Note[];
}
export interface Note {
  id: String;
  text: String;
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private appointmentsURL =
    'https://basic-crm-server.adaptable.app/appointments/';

  private appointmentsSource = new BehaviorSubject([]);
  appointments = this.appointmentsSource.asObservable();

  constructor(private http: HttpClient) {
    this.getAppointments().subscribe((data: Appointment[]) =>
      this.updateData([
        ...data.sort(function (apptA: Appointment, apptB: Appointment) {
          return (
            Date.parse(apptA.date.toString() + ' ' + apptA.time.toString()) -
            Date.parse(apptB.date.toString() + ' ' + apptB.time.toString())
          );
        }),
      ])
    );
  }
  updateData(value: any) {
    this.appointmentsSource.next(value);
  }

  getAppointments() {
    return this.http.get<Appointment[]>(this.appointmentsURL + 'all');
  }

  getMonthlyAppointments(month: String) {
    return this.http.get<Appointment[]>(
      this.appointmentsURL + `month/${month}`
    );
  }

  addAppointment(appointment: Object) {
    return this.http.post<any>(this.appointmentsURL + 'add', appointment);
  }

  updateAppointment(id: String, updatedData: Object) {
    return this.http.put<any>(
      this.appointmentsURL + `update/${id}`,
      updatedData
    );
  }

  deleteAppointment(id: String) {
    return this.http.delete<any>(this.appointmentsURL + `delete/${id}`);
  }

  addNote(id: String, newNote: String) {
    return this.http.post<any>(this.appointmentsURL + `notes/add/${id}`, {
      note: newNote,
    });
  }

  updateNote(appointmentID: String, id: String, newNote: String) {
    return this.http.put<any>(
      this.appointmentsURL + `notes/update/${appointmentID}/${id}`,
      { note: newNote }
    );
  }

  deleteNote(appointmentID: String, id: String) {
    return this.http.delete<any>(
      this.appointmentsURL + `notes/delete/${appointmentID}/${id}`
    );
  }
}
