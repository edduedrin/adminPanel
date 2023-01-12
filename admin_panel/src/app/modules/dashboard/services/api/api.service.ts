import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {

  userid = sessionStorage.getItem("LoginId");
  defaultData = {};
  Base_url = environment.baseUrl;
  constructor(private http: HttpClient) {
    this.defaultData = { user: this.userid?.toString() };
  }

  getdashbord(): Observable<any> {
    return this.http.get<any>(
      this.Base_url + "ledger/mis/companies/list_of_comapaines",
      this.defaultData
    );
  }

  getTotalInvoice() {
    return this.http.get<any>(
      this.Base_url + "ledger/invoices/dashboard?type=all ",
      this.defaultData
    );
  }

  getPendingInvoice() {
    return this.http.get<any>(
      this.Base_url + "ledger/invoices/dashboard?type=all&status=Pending",
      this.defaultData
    );
  }

  getDraftInvoice() {
    return this.http.get<any>(
      this.Base_url + "ledger/invoices/dashboard?type=all&status=Draft",
      this.defaultData
    );
  }

  getTotalInvoiceAmt() {
    return this.http.get<any>(
      this.Base_url +
        "ledger/payment/dashboard?payment_type=invoice_valuation&type=all",
      this.defaultData
    );
  }

  getPaymentRecieved() {
    return this.http.get<any>(
      this.Base_url +
        "ledger/payment/dashboard?payment_type=payment_received&type=all",
      this.defaultData
    );
  }

  getPaymentDue() {
    return this.http.get<any>(
      this.Base_url +
        "ledger/payment/dashboard?payment_type=payment_due&type=all",
      this.defaultData
    );
  }

  getCompaniesOnboarded() {
    return this.http.get<any>(
      this.Base_url + "ledger/company/dashboard?type=all",
      this.defaultData
    );
  }

  getCompaniesPending() {
    return this.http.get<any>(
      this.Base_url + "ledger/company/dashboard?company_status=Hold&type=all",
      this.defaultData
    );
  }

  getNBFCOnboarded() {
    return this.http.get<any>(
      this.Base_url + "ledger/nbfc/dashboard?type=all",
      this.defaultData
    );
  }
}
