import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private subject = new Subject<Customer>();
  private baseUrl: string = 'http://localhost:3000/customers/';
  updateData: Observable<Customer[] | Customer | any>;
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  sendMessage(customer: Customer) {
    this.subject.next(customer);
  }

  receiveMessage(): Observable<Customer> {
    return this.subject.asObservable();
  }

  // Fetch all customers details
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl).pipe(
      tap((customer) => {
        return customer;
      }),
      catchError(this.handleError('getCustomers', []))
    );
  }

  // Add a new customer details
  addCustomers(customer: Customer): Observable<Customer> {
    this.updateData = this.http
      .post<Customer>(this.baseUrl, customer)
      .pipe(catchError(this.handleError('addCustomers', [])));
    return this.updateData;
  }

  // Update a customer detail
  updateCustomers(customer: Customer): Observable<Customer> {
    const id = customer.id;
    this.updateData = this.http
      .patch<Customer>(this.baseUrl + id, customer)
      .pipe(catchError(this.handleError('updateCustomers', [])));
    return this.updateData;
  }

  // Delete a customer
  deleteCustomer(customer: Customer): Observable<Customer> {
    const id = customer.id;
    this.updateData = this.http
      .delete<Customer>(this.baseUrl + id)
      .pipe(catchError(this.handleError('deleteCustomer', [])));
    return this.updateData;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
