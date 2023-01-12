import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DATE_FORMAT } from 'src/app/shared/constants/constants';
import { formatDate } from '@angular/common';


export interface State {
  name: string;
}
@Component({
  selector: 'app-misreports',
  templateUrl: './misreports.component.html',
  styleUrls: ['./misreports.component.scss'],
  providers: [],
})
export class MisreportsComponent implements AfterViewInit {
  showdaterange = "";

  public showreport = "irr";
  mis_downloaded_date = new Date().toLocaleDateString();
  selection = "";
  maxDate!: Date;

  fromDate!: any;

  toDate!: any;
  selectText!: any;
  csvData!: any;

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  Company_mis_select = "";
  invoice_mis_select = "";
  User_mis_select = "";
  nbfc_mis_select = "";
  company_Name!: any[];
  selectedCompanyId: any;
  companyname!: string;
  durationInSeconds = 2;

  ngAfterViewInit() {}

  constructor(private apiService: ApiService, public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.maxDate = new Date();
    if (this.showreport == "irr") {
      this.User_mis_select = "";
      this.invoice_mis_select = "";
      this.nbfc_mis_select = "";
      this.showdaterange = "";
      this.Company_mis_select = "";
      this.selection = "";
      this.dateRange = new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
      });
    }
  }

  radiobuttonChange() {
      this.User_mis_select = "";
      this.invoice_mis_select = "";
      this.Company_mis_select = "";
      this.nbfc_mis_select = "";
      this.showdaterange = "";
      this.selection = "";
      this.dateRange = new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
      });
  }

  // ====== user type dropdwon and auto suggetion =======

  companySuggetion(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length > 2) {
      let companyName = filterValue.toUpperCase();
      this.apiService
        .companynameAutoSuggestion(companyName)
        .subscribe((res) => {
          this.company_Name = [...res.companies];
        });
    }
  }

  displayFn(company: any): string {
    return company && company.company_name ? company.company_name : "";
  }

  getPosts(event: any) {
    this.selectedCompanyId = event._id;
    this.companyname = event.company_name;
  }

  // ========== date range filter ==============>

  dateRangeVal() {
    let start = this.dateRange.value.start;
    let end = this.dateRange.value.end;

    this.fromDate = formatDate(start, "yyyy-MM-dd", "en-US");
    this.toDate = formatDate(end, "yyyy-MM-dd", "en-US");
  }

  // ============== MIS Report =============

  selectChange(event: any) {
    this.selectText = event.source.triggerValue;
  }

  // ========== Company MIS Report ============

  companies_misReport() {
    let filterdata = {
      misReportSelect: this.Company_mis_select,
      dateType: this.showdaterange,
      from: this.fromDate,
      to: this.toDate,
    };

    let headers : any = [];
    const selectedText = this.selectText;
    let title = "";

    if (!filterdata.misReportSelect) {
      this.snackBar.open("Please select report", "Close", {
        duration: this.durationInSeconds * 3000,
        panelClass: ["error-dialog"],
      });
    }
  else if (
       filterdata.misReportSelect == "companiesonboarded" 
    || filterdata.misReportSelect == "companiesapproved" 
    || filterdata.misReportSelect == "companiespending"
    || filterdata.misReportSelect == "companiesupdated"
    || filterdata.misReportSelect == "companies_not_done_payment"
    ) {
    
    if (!filterdata.dateType){
      this.snackBar.open("Please select date", "Close", {
        duration: this.durationInSeconds * 3000,
        panelClass: ["error-dialog"],
      });
    }
    else if((this.showdaterange == "DateRange") && (!this.fromDate && !this.toDate)){
      this.snackBar.open("Please select date range", "Close", {
        duration: this.durationInSeconds * 3000,
        panelClass: ["error-dialog"],
      });
    }
    else{
      this.apiService.companymisReport(filterdata).subscribe((res: any) => {
        if (filterdata.dateType == "DateRange") {
          filterdata.dateType = `from=${filterdata.from}&to=${filterdata.to}`;
          title =`MIS Report - ${selectedText}  \nFilter By Date-${filterdata.dateType}`
        }
        else {
          if (filterdata.dateType == "10days") 
          title = `MIS Report - ${selectedText}  \nFilter By Date- Last 10 Days`;
          else
          title = `MIS Report - ${selectedText}  \nFilter By Date-${filterdata.dateType}`;
        } 
        if (res.status == true && res.company_details) {
          this.csvData = [...res.company_details];     

          if ((filterdata.misReportSelect == "companiesapproved") || (filterdata.misReportSelect == "companiesupdated")) {
            headers = [
              "Company Name",
              "Status",
              "Admin Name",
              "Admin Email",
              "Admin Mobile",
              "GST No",
              "Registered Date",
              "Updated At",
              "Updated By"
            ]
          }

          else{
            headers = [
              "Company Name",
              "Status",
              "Admin Name",
              "Admin Email",
              "Admin Mobile",
              "GST No",
              "Registered Date",
              "Updated At",
            ]
          }

          let options = {
            fieldSeparator: ",",
            quoteStrings: '"',
            decimalseparator: ".",
            showLabels: false,
            showTitle: true,
            title: title,
            useBom: true,
            headers: headers
          };

          new ngxCsv(
            this.csvData,
            `Company_MIS_Report_${this.mis_downloaded_date}`,
             options
          );
        }
        if (res.status == false) {
          this.snackBar.open(res.message, "Close", {
            duration: this.durationInSeconds * 3000,
            panelClass: ["error-dialog"],
          });
        }
      });
    } 
   }
   else{
    this.apiService.companymisReport(filterdata).subscribe((res: any) => {
      title = `MIS Report - ${selectedText}`;

      if (res.status == true && res.company_details) {
        this.csvData = [...res.company_details]; 

        headers = [
          "Company Name",
          "Status",
          "Admin Name",
          "Admin Email",
          "Admin Mobile",
          "GST No",
          "Registered Date",
          "Updated At",
        ]

        
        let options = {
          fieldSeparator: ",",
          quoteStrings: '"',
          decimalseparator: ".",
          showLabels: false,
          showTitle: true,
          title: title,
          useBom: true,
          headers: headers
        };

        new ngxCsv(
          this.csvData,
          `Company_MIS_Report_${this.mis_downloaded_date}`,
           options
        );
      }
      
      if (res.status == true && res.company_list) {
        this.csvData = [...res.company_list];
        const selectedText = this.selectText;

        var option = {
          fieldSeparator: ",",
          quoteStrings: '"',
          decimalseparator: ".",
          showLabels: false,
          showTitle: true,
          title: selectedText,
          useBom: true,
          headers: [
            "Company Name",
            "Credit Limit",
            "Available Credit Limit",
            "Credit Utilize",
            "Invoice Processed",
            "Pending Invoices",
            "Part Pay Invoices",
            "Overdue Invoices",
            "Cih Amount"
          ],
        };
        new ngxCsv(
          this.csvData,
          `Company_MIS_Report_${this.mis_downloaded_date}`,
          option
        );
      }

      if (res.status == false) {
        this.snackBar.open(res.message, "Close", {
          duration: this.durationInSeconds * 3000,
          panelClass: ["error-dialog"],
        });
      }
      
    })
   }
  }

  //========== Invoice MIS Report ============

  invoices_misReport() {
    let filterdata = {
      misReportSelect: this.invoice_mis_select,
      dateType: this.showdaterange,
      from: this.fromDate,
      to: this.toDate,
      userType: this.selection,
      id: this.selectedCompanyId,
    };
    
    if (!filterdata.misReportSelect && !filterdata.dateType) {
      this.snackBar.open("Please select report and date", "Close", {
        duration: this.durationInSeconds * 3000,
        panelClass: ["error-dialog"],
      });
    }
    else if (!filterdata.misReportSelect) {
      this.snackBar.open("Please Select Report", "Close", {
        duration: this.durationInSeconds * 3000,
        panelClass: ["error-dialog"],
      });
    }
    else if (!filterdata.dateType) {
      this.snackBar.open("Please select date", "Close", {
        duration: this.durationInSeconds * 3000,
        panelClass: ["error-dialog"],
      });
    }
    else if (!filterdata.userType) {
      this.snackBar.open("Please select buyer or seller", "Close", {
        duration: this.durationInSeconds * 3000,
        panelClass: ["error-dialog"],
      });
    }
    else if (filterdata.userType !== undefined && filterdata.id == undefined) {   
       if (filterdata.userType == "buyer") {
          this.snackBar.open("Please select buyer", "Close", {
          duration: this.durationInSeconds * 3000,
          panelClass: ["error-dialog"],
        });
       }
       else{
          this.snackBar.open("Please select seller", "Close", {
          duration: this.durationInSeconds * 3000,
          panelClass: ["error-dialog"],
        });
       }
    }
    else{
      this.apiService.invoicemisReport(filterdata).subscribe((res: any) => {
        let headers : any = [];

        if (res.status == true && res.invoice_details) {
          this.csvData = [...res.invoice_details];
          const selectedText = this.selectText;
          let dateType = this.showdaterange;
          if (dateType == "DateRange") {
            dateType = `from=${filterdata.from}&to=${filterdata.to}`;
          }

         if (this.invoice_mis_select == "invoicesuploaded") {
            headers = [
              "Seller Name",
              "Buyer Name",
              "Invoice Number",
              "Invoice Amount",
              "Outstanding Amount",
              "Invoice Status",
              "Invoice Date",
              "Invoice Due Date",
              "Invoice Upload Date",
              "GST Amount",
              "Invoice Confirm Date",
              "Invoice Payment Date",
              "Invoice Rejected Date",
              "Paid Amount"
            ]
          }

         else if (this.invoice_mis_select == "invoicesapproved") {
            headers = [
              "Seller Name",
              "Buyer Name",
              "Invoice Number",
              "Invoice Amount",
              "Outstanding Amount",
              "Invoice Status",
              "Invoice Date",
              "Invoice Due Date",
              "Invoice Upload Date",
              "GST Amount",
              "Invoice Confirm Date",
            ]
          }

         else if (this.invoice_mis_select == "invoicespending") {
            headers = [
              "Seller Name",
              "Buyer Name",
              "Invoice Number",
              "Invoice Amount",
              "Outstanding Amount",
              "Invoice Status",
              "Invoice Date",
              "Invoice Due Date",
              "Invoice Upload Date",
              "GST Amount"
            ]
          }

         else if (this.invoice_mis_select == "invoicesrejected") {
            headers = [
              "Seller Name",
              "Buyer Name",
              "Invoice Number",
              "Invoice Amount",
              "Outstanding Amount",
              "Invoice Status",
              "Invoice Date",
              "Invoice Due Date",
              "Invoice Upload Date",
              "GST Amount",
              "Invoice Rejected Date",
            ]
          }

         else if (this.invoice_mis_select == "automated_upload_invoices_failed") {
          headers = [
            "Seller Name",
            "Buyer Name",
            "Invoice Number",
            "Invoice Amount",
            "Outstanding Amount",
            "Invoice Status",
            "Invoice Date",
            "Invoice Due Date",
            "Invoice Upload Date",
            "GST Amount",
            "Invoice Rejected Date",
            "Invoice Confirm Date",
            "Invoice Payment Date",
            "Paid Amount"
          ]
         } 

         else if (this.invoice_mis_select == "invoices_payment_failed") {
              headers = [
                "Seller Name",
                "Buyer Name",
                "Invoice Number",
                "Invoice Amount",
                "Outstanding Amount",
                "Invoice Status",
                "Invoice Date",
                "Invoice Due Date",
                "Invoice Upload Date",
                "GST Amount",
                "Invoice Confirm Date",
                "Invoice Payment Failed Date"
              ]
            }

         else if (
          (this.invoice_mis_select == "invoicespaid") 
      ||  (this.invoice_mis_select == "invoicespartiallypaid")
      ||  (this.invoice_mis_select == "invoicesoverdue")) {
            headers = [
              "Seller Name",
              "Buyer Name",
              "Invoice Number",
              "Invoice Amount",
              "Outstanding Amount",
              "Invoice Status",
              "Invoice Date",
              "Invoice Due Date",
              "Invoice Upload Date",
              "GST Amount",
              "Invoice Confirm Date",
              "Invoice Payment Date",
              "Paid Amount"
            ]
          }

        else if (this.invoice_mis_select == "invoicesbyduedate") {
          headers = [
            "Seller Name",
            "Buyer Name",
            "Invoice Number",
            "Invoice Amount",
            "Outstanding Amount",
            "Invoice Status",
            "Invoice Date",
            "Invoice Due Date",
            "Invoice Upload Date",
            "GST Amount",
            "Invoice Confirm Date",
            "Invoice Payment Date",
            "Invoice Rejected Date",
            "Paid Amount"
          ]
        }
      

          var options = {
            fieldSeparator: ",",
            quoteStrings: '"',
            decimalseparator: ".",
            showLabels: false,
            showTitle: true,
            title: `MIS Report - ${selectedText}  BY-${filterdata.userType} ${this.companyname}\nFilter By Date-${dateType}`,
            useBom: true,
            headers: headers
          };
          new ngxCsv(
            this.csvData,
            `Invoice_MIS_Report_${this.mis_downloaded_date}`,
            options
          );
        }

        if (res.status == true && res.invoice_data) {
          this.csvData = [...res.invoice_data];
          const selectedText = this.selectText;
          let dateType = this.showdaterange;
          if (dateType == "DateRange") {
            dateType = `from=${filterdata.from}&to=${filterdata.to}`;
          }
          headers = 
          [
            "Seller Name",
            "Buyer Name",
            "Invoice Number",
            "GST Amount",
            "Invoice Amount",
            "Outstanding Amount",
            "Invoice Status",
            "Invoice Date",
            "Interest paid",
            "Remaining Interest",
            "Discount"
          ]

          var options = {
            fieldSeparator: ",",
            quoteStrings: '"',
            decimalseparator: ".",
            showLabels: false,
            showTitle: true,
            title: `MIS Report - ${selectedText}  BY-${filterdata.userType} ${this.companyname}\nFilter By Date-${dateType}`,
            useBom: true,
            headers: headers
          };
          new ngxCsv(
            this.csvData,
            `Invoice_MIS_Report_${this.mis_downloaded_date}`,
            options
          );
        }
        if (res.status == true && res.discount_data) {
          this.csvData = [...res.discount_data];
          const selectedText = this.selectText;
          let dateType = this.showdaterange;
          if (dateType == "DateRange") {
            dateType = `from=${filterdata.from}&to=${filterdata.to}`;
          }

          if (this.invoice_mis_select == "discount") 
          {
            headers = 
          [
            "Seller Name",
              "Buyer Name",
              "Invoice Number",
              "Gst Amount",
              "Invoice Amount",
              "Outstanding Amount",
              "Invoice Status",
              "Invoice Date",
              "Applied Discount",
              "Paid Discount",
              "Interest",
              "Loan Amount for mcap",
              "Paid to mcap",
              "Disbursed Amount",
              "Combine Fee",
              "Mcap Share",
              "Xuriti Share",
              "FTM",
              "Full Discount",
              "App Id"
          ] 
          }
          else
          {
            headers = 
            [
                "Seller Name",
                "Buyer Name",
                "Invoice Number",
                "Gst Amount",
                "Invoice Amount",
                "Outstanding Amount",
                "Invoice Status",
                "Invoice Date",
                "Applied Discount",
                "Applied Interest",
                "Discount Paid",
                "Intrest Paid",
                "Loan Amount for mcap",
                "Paid to mcap",
                "Disbursed Amount",
                "Combine Fee",
                "Mcap Share",
                "Xuriti Share",
                "FTM",
                "Full Discount",
                "App Id"
            ] 
          }
          var options = {
            fieldSeparator: ",",
            quoteStrings: '"',
            decimalseparator: ".",
            showLabels: false,
            showTitle: true,
            title: `MIS Report - ${selectedText}  BY-${filterdata.userType} ${this.companyname}\nFilter By Date-${dateType}`,
            useBom: true,
            // noDownload: true,
            headers: headers
          };
          
          new ngxCsv(
            this.csvData,
            `Invoice_MIS_Report_${this.mis_downloaded_date}`,
            options
          );
        }     
        if (res.status == false) {
          this.snackBar.open(res.message, "Close", {
            duration: this.durationInSeconds * 3000,
            panelClass: ["error-dialog"],
          });
        }
      });
    }
  }

  //==========   User MIS Report  ============

  users_misRrport() {
    let filterdata = {
      misReportSelect: this.User_mis_select,
      dateType: this.showdaterange,
      from: this.fromDate,
      to: this.toDate,
    };

    if (!filterdata.misReportSelect && !filterdata.dateType) {
      this.snackBar.open("Please select report and date", "Close", {
        duration: this.durationInSeconds * 3000,
        panelClass: ["error-dialog"],
      });
    }
    else if (!filterdata.misReportSelect) {
      this.snackBar.open("Please select report", "Close", {
        duration: this.durationInSeconds * 3000,
        panelClass: ["error-dialog"],
      });
    }
    else if (!filterdata.dateType) {
      this.snackBar.open("Please select date", "Close", {
        duration: this.durationInSeconds * 3000,
        panelClass: ["error-dialog"],
      });
    }
     else if((filterdata.dateType == "DateRange") && (!this.fromDate && !this.toDate)){
      this.snackBar.open("Please select date range", "Close", {
        duration: this.durationInSeconds * 3000,
        panelClass: ["error-dialog"],
      });
    }

    else{
      this.apiService.usersReport(filterdata).subscribe((res: any) => {
         let title = ""
         const selectedText = this.selectText;
         if (filterdata.dateType == "DateRange") {
          filterdata.dateType = `from=${filterdata.from}&to=${filterdata.to}`;
          title =`MIS Report - ${selectedText}  \nFilter By Date-${filterdata.dateType}`
        }
        else {
          if (filterdata.dateType == "10days") 
          title = `MIS Report - ${selectedText}  \nFilter By Date- Last 10 Days`;
          else
          title = `MIS Report - ${selectedText}  \nFilter By Date-${filterdata.dateType}`;
        } 

        if (res && res.status == true) {
          this.csvData = [...res.user_detail];
          var options = {
            fieldSeparator: ",",
            quoteStrings: '"',
            decimalseparator: ".",
            showLabels: false,
            showTitle: true,
            title: title,
            useBom: true,
            // noDownload: true,
            headers: ["Name", "Mobile", "Email", "Status", "Role", "Created At","Last Log-In"],
          };
          new ngxCsv(
            this.csvData,
            `User_MIS_Report_ ${this.mis_downloaded_date}`,
            options
          );
        } 
        else {
          this.snackBar.open(res.message, "Close", {
            duration: this.durationInSeconds * 3000,
            panelClass: ["error-dialog"],
          });
        }
      });
    }
  }
  
  //=========    NBFC MIS Report  ============
  nbfc_misRrport() {
    let filterdata = {
      misReportSelect: this.nbfc_mis_select,
      dateType: this.showdaterange,
      from: this.fromDate,
      to: this.toDate,
    };

    if (!filterdata.misReportSelect && !filterdata.dateType) {
      this.snackBar.open("Please select report and date", "Close", {
        duration: this.durationInSeconds * 3000,
        panelClass: ["error-dialog"],
      });
    }
    else if (!filterdata.misReportSelect) {
      this.snackBar.open("Please Select Report", "Close", {
        duration: this.durationInSeconds * 3000,
        panelClass: ["error-dialog"],
      });
    }
    else if (!filterdata.dateType) {
      this.snackBar.open("Please select date", "Close", {
        duration: this.durationInSeconds * 3000,
        panelClass: ["error-dialog"],
      });
    }
   else
   {
    this.apiService.nbfcmisReport(filterdata).subscribe((res: any) => {
      if (res && res.status == true && res.nbfc_onboarding) {
        this.csvData = [...res.nbfc_onboarding];
        const selectedText = this.selectText;
        let dateType = this.showdaterange;
        let title = "";
  
          if (dateType == "DateRange") {
            dateType = `from=${filterdata.from}&to=${filterdata.to}`;
            title = `MIS Report - ${selectedText} \nFilter By Date-${dateType}`
          }
          else {
            if (dateType == "10days") 
            title = `MIS Report - ${selectedText}  \nFilter By Date- Last 10 Days`;
            else
            title = `MIS Report - ${selectedText}  \nFilter By Date-${dateType}`;
          }

        var options = {
          fieldSeparator: ",",
          quoteStrings: '"',
          decimalseparator: ".",
          showLabels: false,
          showTitle: true,
          title: title,
          useBom: true,
          // noDownload: true,
          headers: [
            "NBFC Name",
            "Address",
            "Email",
            "Mobile Number",
            "Status",
            "Created At",
          ],
        };
        new ngxCsv(
          this.csvData,
          `NBFC_MIS_Report_ ${this.mis_downloaded_date}`,
          options
        );
      }
      if (res && res.status == true && res.nbfc_mappped) {
        this.csvData = [...res.nbfc_mappped];
        const selectedText = this.selectText;
        let dateType = this.showdaterange;
        if (dateType == "DateRange") {
          dateType = `from=${filterdata.from}&to=${filterdata.to}`;
        }
        var options = {
          fieldSeparator: ",",
          quoteStrings: '"',
          decimalseparator: ".",
          showLabels: false,
          showTitle: true,
          title: `MIS Report - ${selectedText} \nFilter By Date-${dateType}`,
          useBom: true,
          // noDownload: true,
          headers: [
            "Buyer Name",
            "Seller Name",
            "Mapped By",
            "NBFC Name",
            "Status",
            "Created At",
          ],
        };
        new ngxCsv(
          this.csvData,
          `NBFC_MIS_Report_ ${this.mis_downloaded_date}`,
          options
        );
      }
      if (res.status == false) {
        this.snackBar.open(res.message, "Close", {
          duration: this.durationInSeconds * 3000,
          panelClass: ["error-dialog"],
        });
      }
    });
   }
  }
}

@Component({
  selector: "misreports-dialog",
  templateUrl: "misreports-dialog.html",
  styleUrls: ["./misreports.component.scss"],
})
export class MisreportsDialog implements OnInit {
  constructor() {}

  ngOnInit() {}
}
