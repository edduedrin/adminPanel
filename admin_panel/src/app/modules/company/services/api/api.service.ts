import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
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

  getCompanyList(gstin: string, createdAt: any): Observable<any> {
    return this.http.get<any>(
      this.Base_url + `entity/entities`,
      this.defaultData
    );
  }

  updateCompanyDetails(companyid: string, companyDetail: any): Observable<any> {
    return this.http.patch<any>(
      this.Base_url + `entity/update-entity/${companyid}`,
      { ...companyDetail, ...this.defaultData }
    );
  }

  changeCompanyStatus(companyid: string, statusBody: any): Observable<any> {
    return this.http.patch<any>(
      this.Base_url + `entity/status-entity/${companyid}`,
      { ...statusBody, ...this.defaultData }
    );
  }

  fetchCreditPlansByCompanyId(companyid: string): Observable<any> {
    return this.http.get<any>(
      this.Base_url + `entity/${companyid}/credit-plans`,
      this.defaultData
    );
  }

  addCreditPlan(companyid: string, creditPlan: any): Observable<any> {
    return this.http.post<any>(
      this.Base_url + `entity/${companyid}/credit-plans`,
      { ...creditPlan, ...this.defaultData }
    );
  }

  editCreditPlan(companyid: string, planid: string, creditPlan: any) {
    return this.http.put<any>(
      this.Base_url + `entity/${companyid}/credit-plans/${planid}`,
      { ...creditPlan, ...this.defaultData }
    );
  }

  companynameAutoSuggestion(companyName: any): Observable<any> {
    const headerDict = {
      'loader_flag': 'false'
    }    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.get<any>(
      this.Base_url + `entity/entities?companyName=${companyName}`,requestOptions
      // this.defaultData
    );
  }

  companynameAutoSuggestionforMap(company_name: string): Observable<any> {
    const headerDict = {
      'loader_flag': 'false'
    }    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    //autosuggetionformap
    return this.http.get<any>(
      this.Base_url + `entity/entities?companyName=${company_name}`, requestOptions,
    );
  }

  getCompany(companyid: any): Observable<any> {
    //Company detail by id
    return this.http.get<any>(
      this.Base_url + `entity/entity/${companyid}`,
      this.defaultData
    );
  }

  defaultPlan(companyid: string, planid: string) {
    return this.http.patch<any>(
      this.Base_url + `entity/${companyid}/credit-plans/${planid}`,
      this.defaultData
    );
  }

  getPlanDetailsByPlanid(companyid: string, planid: string) {
    return this.http.get<any>(
      this.Base_url + `entity/${companyid}/credit-plans?plan_id=${planid}`,
      this.defaultData
    );
  }

  getMappedBuyersByPlanid(companyid: string, planid: string) {
    return this.http.get<any>(
      this.Base_url + `entity/${companyid}/credit-plans/${planid}`,
      this.defaultData
    );
  }

  getCompanies() {    
    const headerDict = {
      'loader_flag': 'false'
    }    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    //get list of companies for auto suggetion.
    return this.http.get<any>(
      this.Base_url + `entity/entities?companyName=`, requestOptions
      // this.defaultData,
    );
  }

  addCompanyPlanMap(body: any) {
    return this.http.post<any>(
      this.Base_url + `entity/${body.seller_id}/credit-plans-map`,
      { ...body, ...this.defaultData }
    );
  }

  unmapCompany(body: any) {
    return this.http.delete<any>(
      this.Base_url +
        `entity/${body.companyid}/credit-plans/${body.planid}/buyers/${body.buyerid}`,
      this.defaultData
    );
  }

  deleteCreditPlan(companyid: string, planid: string) {
    return this.http.delete<any>(
      this.Base_url + `entity/${companyid}/credit-plans/${planid}`,
      this.defaultData
    );
  }

  //=========== filter entities ============>

  filterentities(filterdata: any): Observable<any> {
    let urlStr: string = this.Base_url + "entity/entities";
    let firstEle = true;
    let requestOptions = { };

    if (filterdata.to && filterdata.from) {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += `from=${filterdata.from}&to=${filterdata.to}`;
    }

    if (filterdata.gstin) {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += "gstin=" + filterdata.gstin;
      const headerDict = {
        'loader_flag': 'false'
      }    
      requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders(headerDict), 
      };
    }
    if (filterdata.status) {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += "status=" + filterdata.status;
    }

    if (filterdata.company_name) {
      if (!firstEle) {
        urlStr += "&";
      } else {
        urlStr += "?";
        firstEle = false;
      }
      urlStr += "companyName=" + filterdata.company_name;
      const headerDict = {
        'loader_flag': 'false'
      }    
      requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders(headerDict),
      };
    }

    return this.http.get<any>(urlStr, requestOptions);
  }

  //==========  credit limit verification =========
  credtilimitapproval() {
    return this.http.get<any>(
      this.Base_url + `entity/credtilimitapproval`,
      this.defaultData
    );
  }
  //=========   credit limit status ===========
  creditlimitapprovalStatus(body: any) {
    return this.http.patch<any>(this.Base_url + "entity/credtilimitapproval", {
      ...body,
      ...this.defaultData,
    });
  }

  //=========   credit limit history ==========
  creditlimithistory() {
    return this.http.get<any>(
      this.Base_url + "entity/credtilimitapproval?history=history",
      this.defaultData
    );
  }

  // ============OFFLINE PAYMENT =============

  getSellerlistByBuyerid(companyid: string) {
    return this.http.get(
      this.Base_url + `invoice/paymentsummary?buyer=${companyid}`,
      this.defaultData
    );
  }

  getPaymentDetails(companyid: string, sellerid: string) {
    return this.http.get(
      this.Base_url +
        `invoice/paymentsummary?buyer=${companyid}&seller=${sellerid}`,
      this.defaultData
    );
  }

  getPaymentDetailsAtSettleAmt(companyid: string, sellerid: string, amt:any, date: any){
    return this.http.get(
      this.Base_url + `invoice/paymentsummary/?buyer=${companyid}&seller=${sellerid}&pay_amount=${amt}&payment_date=${date}`
    );
  }

  offlinePayment(formData: any) {
    return this.http.post(
      this.Base_url + `payment/offline_payment`,
      formData
    );
  }

  getkycDetails(data: any) {
    return this.http.post(this.Base_url + "kyc/kyc-approval", {
      ...data,
      ...this.defaultData,
    });
  }
  getGSTDetails(data: any) {
    return this.http.post(this.Base_url + "entity/get-entity-gst-data", {
      ...data,
      ...this.defaultData,
    });
  }

  // ======== KYC ===============
  kycRequest(data: any) {
    return this.http.post(this.Base_url + "/entity/onboard", data);
  }

  // =============== E-Sign =====================
  autosuggetionNBFC(NBFC_Name: string){
    const headerDict = {
      'loader_flag': 'false'
    }    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get(
      this.Base_url +
        `nbfcs/get-nbfc?nbfc_name=${NBFC_Name}`,
        requestOptions
    );
  }

  esign(body: any){
    return this.http.post(this.Base_url +`kyc/document-esign`, body)
  }

  esign_link(body:any){
    console.log(body)
    return this.http.post(this.Base_url+`kyc/document-esign`,body)
  }

  // company get compnies comments

  get_company_comments_by_id(company_id:any){
    return this.http.get(this.Base_url + `entity/${company_id}/get-comments`);
  }

  add_comment(body:any){
    return this.http.post(this.Base_url + `entity/add-comment`,body);
  }

}
