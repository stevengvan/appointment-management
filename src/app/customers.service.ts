import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface Customer {
  _id: String;
  avatar: String;
  name: String;
  email: String;
  phone: String;
  subscription: String;
  last_visit: String;
  notes: Array<String>;
}

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private customersURL = 'https://basic-crm-server.adaptable.app/customers/';

  private customersSource = new BehaviorSubject([]);
  customers = this.customersSource.asObservable();

  constructor(private http: HttpClient) {
    this.getCustomers().subscribe((data: Customer[]) =>
      this.updateData([...data])
    );
  }

  updateData(value: any) {
    this.customersSource.next(value);
  }

  getCustomers() {
    return this.http.get<Customer[]>(this.customersURL + 'all');
  }

  getCustomer(id: String) {
    return this.http.get<Customer>(this.customersURL + `${id}`);
  }
}
