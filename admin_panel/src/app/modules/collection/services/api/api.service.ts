import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class ApiService {
  BaseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getOverdueInvoices(): Observable<any> {
    return this.http.get(this.BaseUrl + 'collection/invoices');
  }

  getOverdueInvoiceDetailsById(collection_id: string){
    return this.http.get(this.BaseUrl + `collection/invoices/${collection_id}`);
  }

  updateOverDueInvoice(body:any,collection_id:string):Observable<any>{
      return this.http.patch<any>(this.BaseUrl + `collection/invoices/${collection_id}`,body);
  }

  getPaymentHistory(invoiceid:any):Observable<any>{
    return this.http.get<any>(this.BaseUrl + `collection/invoices/${invoiceid}/paymenthistory`);
  }
  
  getCollectionStaff():Observable<any>{
    return this.http.get<any>(this.BaseUrl + `collection/userlist`);
  }

  waiverPayment(body:any){
      return this.http.post(this.BaseUrl + `collection/wavers/payment`,body)
  }

  getwaiverPaymentHistory(invoiceid:string){
    return this.http.get(this.BaseUrl + `collection/invoices/${invoiceid}/waiver_history`);
  }
}
