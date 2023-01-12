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

  getNBFClist(nbfc_name: string, nbfc_status: string) {
    let requestOptions = {}
    if(nbfc_name.length > 0){
      const headerDict = {
        'loader_flag': 'false'
      }
      requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders(headerDict),
      };
    }
    return this.http.get(
      this.Base_url +
        `nbfcs/get-nbfc?nbfc_name=${nbfc_name}&nbfc_status=${nbfc_status}`, requestOptions
    );
  }

  getNBFCDetailsByNBFCid(nbfcid: string) {
    return this.http.get(
      this.Base_url + `nbfcs/get-nbfc/${nbfcid}`,
      this.defaultData
    );
  }

  addNBFC(body: any) {
    return this.http.post(this.Base_url + "nbfcs/add-nbfc", {
      ...body,
      ...this.defaultData,
    });
  }

  updateNBFC(nbfcid: string, body: any) {
    return this.http.put(this.Base_url + `nbfcs/edit-nbfc/${nbfcid}`, {
      ...body,
      ...this.defaultData,
    });
  }

  // getMappingCompanies(nbfcid: string){
  //   return this.http.get(this.Base_url + `nbfcs/${nbfcid}/buyers`);
  // }

  companylistForAutoSuggestion(company_name: string): Observable<any> {
    const headerDict = {
      'loader_flag': 'false'
    }    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    //autosuggetionformap
    return this.http.get<any>(
      this.Base_url + `entity/entities?companyName=${company_name}`,
      requestOptions
    );
  }

  sellerCompanylistForAutoSuggestion(company_name: string): Observable<any> {
    const headerDict = {
      'loader_flag': 'false'
    }    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    //seller autosuggetionformap
    return this.http.get<any>(
      this.Base_url + `entity/entities?companyName=${company_name}`, requestOptions
    );
  }

  getNBFCCompanyMapping(nbfcid: string) {
    return this.http.get<any>(
      this.Base_url + `nbfcs/nbfc-detail/${nbfcid}`,
      this.defaultData
    );
  }

  NBFCCompanyMapping(nbfcid: string, userid: string, body: any) {
    return this.http.post<any>(
      this.Base_url + `nbfcs/add-buyer/${nbfcid}/${userid}`,
      { ...body, ...this.defaultData }
    );
  }

  mapCompaniesByFileupload(file: any) {
    return this.http.post<any>(this.Base_url + `nbfcs/nbfcs-excel`, {
      ...file,
      ...this.defaultData,
    });
  }

  NBFCCompanyUnMapping(nbfcid: string, buyerid: string, sellerid: string) {
    //Un-Mapping
    const body = {
      companies: [{ buyer_id: buyerid, seller_id: sellerid }],
    };
    return this.http.post<any>(this.Base_url + `nbfcs/unmap-nbfc/${nbfcid}`, {
      ...body,
      ...this.defaultData,
    });
  }

  NBFCBuyerReconciliation(body: any) {
    return this.http.post<any>(this.Base_url + `nbfcs/fetch-nbfc`, {
      ...body,
      ...this.defaultData,
    });
  }

  downloadFile(key: string) {
    return this.http.get<any>(
      this.Base_url + `nbfcs/nbfc-load/${key}`,
      this.defaultData
    );
  }

  sendBuyerReconciliation(formData: any, nbfc_id: string){
    return this.http.post<any>(
      this.Base_url + `nbfcs/nbfc-reconcellation/${nbfc_id}`,formData
    );
  }
}
