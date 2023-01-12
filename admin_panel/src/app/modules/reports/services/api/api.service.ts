import { HttpClient, HttpHeaders } from "@angular/common/http";
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

  getPaymentHistory() {
    return this.http.get(
      this.Base_url + "payment/transactionsstatement",
      this.defaultData
    );
  }

  get_emandateHistory() {
    return this.http.get(
      this.Base_url + "payment/misreports",
      this.defaultData
    );
  }

  changePaymentStatus(id: string, status: string) {
    return this.http.patch(this.Base_url + `transction/${id}`, status);
  }

  changeEmandateStatus(id: string, status: string) {
    return this.http.patch(this.Base_url + `transctions/${id}`, status);
  }

  // ======== auto suggetion ========
  companynameAutoSuggestion(companyName: string): Observable<any> {
    const headerDict = {
      'loader_flag': 'false'
    }    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get<any>(
      this.Base_url + `entity/entities?companyName=${companyName}`, requestOptions
    );
  }

  // auto suggetion nbfcs  
  nbfcAutoSuggestion(nbfc_name : string){
    const headerDict = {
      'loader_flag': 'false'
    }    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get<any>(
      this.Base_url + `nbfcs/get-nbfc?nbfc_name=${nbfc_name}`, requestOptions
    );
  }

  // ========== Companies Summary =========
  getCompaniesSummary(companyid: string){
    if(companyid && companyid != '' && companyid != null && companyid != undefined){
      return this.http.get<any>(
        this.Base_url + `ledger/mis/companies/list_of_comapaines?sellerid=${companyid}`,
        this.defaultData
      );
    }else{
      return this.http.get<any>(
        this.Base_url + `ledger/mis/companies/list_of_comapaines?company_list=company_list`,
        this.defaultData
      );
    }    
  }

  // ========= Invoice Summary ===========
  getInvoiceSummary(filter_data: any){
    let url = `ledger/invoices/invoice_summary`;
    let firstEle = true;   
    if (filter_data.to_date && filter_data.to_date != null && filter_data.to_date != undefined && filter_data.to_date != '' &&
     filter_data.from_date && filter_data.from_date != null && filter_data.from_date != undefined && filter_data.from_date != '') {
      if (!firstEle) {
        url += "&";
      } else {
        url += "?";
        firstEle = false;
      }
      url +=`from=${filter_data.from_date}&to=${filter_data.to_date}`;
    }
    if(filter_data.companyid){
      if (!firstEle) {
        url += "&";
      } else {
        url += "?";
        firstEle = false;
      }
      url +=`seller=${filter_data.companyid}`;
    }
    return this.http.get<any>(this.Base_url + url);
  }

  // ========== Ledger Report =============
  getLedgerReport(filterdata : any) {
    let requestOptions = {};
    let url = `ledger/reports?type=admin`;

    if(filterdata && filterdata.invoice_number != undefined && filterdata.invoice_number != ''){
      const headerDict = {
        'loader_flag': 'false'
      }    
      requestOptions = {
        headers: new HttpHeaders(headerDict), 
      };
      url +=`&invoice_number=${filterdata.invoice_number}`;
    }

    if(filterdata && filterdata.sellerid != undefined){
      url +=`&seller=${filterdata.sellerid}`;
    }

    if(filterdata && filterdata.to != undefined && filterdata.to != null && filterdata.to != ''
      && filterdata.from != undefined && filterdata.from != null && filterdata.from != ''){
        url +=`&from_date=${filterdata.from}&to_date=${filterdata.to}`
     }
    return this.http.get<any>(this.Base_url + url, requestOptions);
  }

  // ========== Company MIS Report =========
  companymisReport(filterdata: any) {
    const headers = new HttpHeaders({
      Accept: "text/csv",
    });
    let urlStr: string =
      this.Base_url + `ledger/mis/companies/${filterdata.misReportSelect}`;
    let firstEle = true;

    if (filterdata.dateType == "Today") {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += `days=0`;
    }
    if (filterdata.dateType == "Yesterday") {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += `days=1`;
    }
    if (filterdata.dateType == "DateRange") {
      if (filterdata.to && filterdata.from) {
        if (!firstEle) {
          urlStr += "&";
        } else {
          urlStr += "?";
          firstEle = false;
        }
        urlStr += `from=${filterdata.from}&to=${filterdata.to}`;
      }
    }
    if (filterdata.dateType == "10days") {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += `days=10`;
    }

    if (filterdata.misReportSelect == "companiesapproved") {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += `status=Approved`;
    }

    if (filterdata.misReportSelect == "companiespending") {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += `status=Hold`;
    }
    return this.http.get<any>(urlStr, {
      ...{ headers: headers },
      ...this.defaultData,
    });
  }
  // =========== Invoice MIS Report =========
  invoicemisReport(filterdata: any) {
    let urlStr: string =
      this.Base_url + `ledger/mis/invoices/${filterdata.misReportSelect}`;
    let firstEle = true;

    if (filterdata.dateType == "Today") {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += `days=0`;
    }
    if (filterdata.dateType == "Yesterday") {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += `days=1`;
    }
    if (filterdata.dateType == "DateRange") {
      if (filterdata.to && filterdata.from) {
        if (!firstEle) {
          urlStr += "&";
        } else {
          urlStr += "?";
          firstEle = false;
        }
        urlStr += `from=${filterdata.from}&to=${filterdata.to}`;
      }
    }
    if (filterdata.dateType == "10days") {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += `days=10`;
    }

    if (filterdata.userType == "buyer") {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += `buyer_id=${filterdata.id}`;
    }
    if (filterdata.userType == "seller") {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += `seller_id=${filterdata.id}`;
    }
    if (filterdata.misReportSelect == "invoicesapproved") {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += `status=Confirmed`;
    }
    if (filterdata.misReportSelect == "invoicespending") {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += `status=Pending`;
    }

    if (filterdata.misReportSelect == "invoicesrejected") {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += `status=Rejected`;
    }
    if (filterdata.misReportSelect == "invoicespartiallypaid") {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += `status=Partpay`;
    }
    if (filterdata.misReportSelect == "invoicespaid") {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += `status=Paid`;
    }
    return this.http.get<any>(urlStr, this.defaultData);
  }
  // ===========  User MIS Report   =========
  usersReport(filterdata: any) {
    let urlStr: string =
      this.Base_url + `ledger/mis/users/${filterdata.misReportSelect}`;
    let firstEle = true;

    if (filterdata.dateType == "Today") {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += `days=0`;
    }
    if (filterdata.dateType == "Yesterday") {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += `days=1`;
    }
    if (filterdata.dateType == "DateRange") {
      if (filterdata.to && filterdata.from) {
        if (!firstEle) {
          urlStr += "&";
        } else {
          urlStr += "?";
          firstEle = false;
        }
        urlStr += `from=${filterdata.from}&to=${filterdata.to}`;
      }
    }
    if (filterdata.dateType == "10days") {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += `days=10`;
    }
    return this.http.get<any>(urlStr, this.defaultData);
  }
  // ===========  NBFC MIS Report   =========
  nbfcmisReport(filterdata: any) {
    let urlStr: string = this.Base_url + `nbfcs/${filterdata.misReportSelect}`;
    let firstEle = true;

    if (filterdata.dateType == "Today") {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += `days=0`;
    }
    if (filterdata.dateType == "Yesterday") {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += `days=1`;
    }
    if (filterdata.dateType == "DateRange") {
      if (filterdata.to && filterdata.from) {
        if (!firstEle) {
          urlStr += "&";
        } else {
          urlStr += "?";
          firstEle = false;
        }
        urlStr += `from=${filterdata.from}&to=${filterdata.to}`;
      }
    }
    if (filterdata.dateType == "10days") {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += `days=10`;
    }

    return this.http.get<any>(urlStr, this.defaultData);
  }

  // get receivable statement
  getReceivableStatement(filterdata:any){
    let urlStr: string = this.Base_url + `ledger/companies/receivables_statement`;
    let firstEle = true;

    if (filterdata.anchor) {
      if (!firstEle) {
         urlStr += "&"
      }
      else{
        urlStr += "?"
        firstEle = false;
      }
      urlStr += `seller=${filterdata.anchor}` 
    }

    if (filterdata.dealer) {
      if (!firstEle) {
         urlStr += "&"
      }
      else{
        urlStr += "?"
        firstEle = false;
      }
      urlStr += `buyer=${filterdata.dealer}` 
    }

    if (filterdata.inv_date) {
      if (!firstEle) {
         urlStr += "&"
      }
      else{
        urlStr += "?"
        firstEle = false;
      }
      urlStr += `inv_date=${filterdata.inv_date}` 
    }

    if (filterdata.nbfc) {
      if (!firstEle) {
         urlStr += "&"
      }
      else{
        urlStr += "?"
        firstEle = false;
      }
      urlStr += `nbfc_mapped=${filterdata.nbfc}` 
    }
    return this.http.get(urlStr);
  }

  // get disbursenment statement
  getDisbursenmentStatement(filterdata:any){
    let urlStr : string = this.Base_url + `ledger/companies/disbursenment_statement`

    let firstEle = true;

    if (filterdata.anchor) {
      if (!firstEle) {
         urlStr += "&"
      }
      else{
        urlStr += "?"
        firstEle = false;
      }
      urlStr += `seller=${filterdata.anchor}` 
    }

    if (filterdata.dealer) {
      if (!firstEle) {
         urlStr += "&"
      }
      else{
        urlStr += "?"
        firstEle = false;
      }
      urlStr += `buyer=${filterdata.dealer}` 
    }

    if (filterdata.inv_date) {
      if (!firstEle) {
         urlStr += "&"
      }
      else{
        urlStr += "?"
        firstEle = false;
      }
      urlStr += `inv_date=${filterdata.inv_date}` 
    }

    if (filterdata.nbfc) {
      if (!firstEle) {
         urlStr += "&"
      }
      else{
        urlStr += "?"
        firstEle = false;
      }
      urlStr += `nbfc_mapped=${filterdata.nbfc}` 
    }
    
    return this.http.get(urlStr);
  }

  // ageing report
  ageing_report(filter_data:any){
    let urlStr : string = this.Base_url + `ledger/invoices/ageing/receivables_agings`;

    let firstEle = true;
    
    if (filter_data.as_on_date) {
      if (!firstEle) {
        urlStr += "&"
     }
     else{
       urlStr += "?"
       firstEle = false;
     }
     urlStr += `as_on_date=${filter_data.as_on_date}` 
    }

    if (filter_data.anchor_id) {
      if (!firstEle) {
        urlStr += "&"
     }
     else{
       urlStr += "?"
       firstEle = false;
     }
     urlStr += `Anchor=${filter_data.anchor_id}` 
    }
    
    if (filter_data.nbfc_id) {
      if (!firstEle) {
        urlStr += "&"
     }
     else{
       urlStr += "?"
       firstEle = false;
     }
     urlStr += `Financing_Partner=${filter_data.nbfc_id}` 
    }
    return this.http.get(urlStr);
  }
  
  // ageing by invoice
  ageing_by_invoice(filter_data:any){

    let urlStr : string = this.Base_url + `ledger/invoices/ageing/receivables_agings_invoice`;

    let firstEle = true;

    if (filter_data.as_on_date) {
      if (!firstEle) {
        urlStr += "&"
     }
     else{
       urlStr += "?"
       firstEle = false;
     }
     urlStr += `as_on_date=${filter_data.as_on_date}` 
    }

    if (filter_data.anchor_id) {
      if (!firstEle) {
        urlStr += "&"
     }
     else{
       urlStr += "?"
       firstEle = false;
     }
     urlStr += `Anchor=${filter_data.anchor_id}` 
    }

    if (filter_data.dealer_id) {
      if (!firstEle) {
        urlStr += "&"
     }
     else{
       urlStr += "?"
       firstEle = false;
     }
     urlStr += `Dealer=${filter_data.dealer_id}` 
    }

    if (filter_data.nbfc_id) {
      if (!firstEle) {
        urlStr += "&"
     }
     else{
       urlStr += "?"
       firstEle = false;
     }
     urlStr += `Financing_Partner=${filter_data.nbfc_id}` 
    }
    return this.http.get(urlStr);
  }

  getTransactionLedger(filter_data:any){
    let urlStr : string = this.Base_url + `ledger/companies/transaction_ledger?${filter_data.user_type}=${filter_data._id}`;

    if (filter_data.as_on_date) {      
     urlStr += `&as_on_date=${filter_data.as_on_date}` 
    }
    return this.http.get(urlStr);
  }
}
