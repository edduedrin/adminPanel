import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, MatSortable, Sort } from "@angular/material/sort";
import { LiveAnnouncer } from "@angular/cdk/a11y";

import { ApiService } from "../../services/api/api.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DATE_FORMAT } from "src/app/shared/constants/constants";
import { MatDialog } from "@angular/material/dialog";
import { thousandsSeprator } from 'src/app/shared/constants/constants';
import { FormControl, FormGroup } from "@angular/forms";
import { formatDate } from "@angular/common";
import { _isNumberValue } from "@angular/cdk/coercion";


@Component({
  selector: "app-invoicesummery",
  templateUrl: "./invoicesummery.component.html",
  styleUrls: ["./invoicesummery.component.scss"],
  providers: [],
})
export class InvoiceSummeryComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  Date_Format = DATE_FORMAT;

  company_select: FormControl = new FormControl();

  company_Name!: any;

  selectedCompanyId: string = '';

  invoiceNumberControl = new FormControl();

  invoice_number!: string;

  toDate: any;

  fromDate: any;

  maxDate!: Date;

  filter_data: any = [];

  displayedColumns: string[] = [
    'invoice_number',
    "seller",
    'buyer',
    'invoice_date',
    'total_tax',
    'invoice_amount',
    'total_invoice_amount',
    'paid_discount',
    'paid_interest',
    'already_paid_amount',
    'outstanding_amount',
    'discount',
    'interest',
    'payable_amount',
    'invoice_due_date',
    'invoice_status',    
    'createdAt',
    // 'invoice_confirm_date',
    'last_payment_date',
  ];

  dataSource = new MatTableDataSource();

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    public dialog: MatDialog,
    private apiservice: ApiService
  ) {}

  ngOnInit(): void {
    this.maxDate = new Date();
    this.getInvoiceSummary();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilterInvoiceNo(invoiceno: any) {
    const filterValue = (invoiceno.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
    this.invoice_number = filterValue.toLocaleUpperCase();
    if(this.invoice_number && this.invoice_number != undefined && this.invoice_number != null){
      this.filter_data.invoice_number = this.invoice_number
      this.getInvoiceSummary();
    }
  }

  datefilter() {
    const start = this.dateRange.value.start;
    const end = this.dateRange.value.end;
    this.fromDate = formatDate(start, "yyyy-MM-dd", "en-US");
    this.toDate = formatDate(end, "yyyy-MM-dd", "en-US");
    if(this.fromDate && this.fromDate != undefined && this.fromDate != null &&
      this.toDate && this.toDate != undefined && this.toDate != null){
        this.filter_data.from_date = this.fromDate;
        this.filter_data.to_date = this.toDate
        this.getInvoiceSummary();
      }
  }

  clearInvoiceNumber(){
    this.invoiceNumberControl = new FormControl();
  }

  // ========= dropdwon and auto suggetion =======
  companySuggetion(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length > 2) {
      let companyName = filterValue.toUpperCase();
      this.apiservice
        .companynameAutoSuggestion(companyName)
        .subscribe((res) => {
          this.company_Name = [...res.companies];
        });
    }
  }

  displayFn(company: any): string {
    return company && company.company_name ? company.company_name : "";
  }

  getPosts(companyid: any) {
    this.selectedCompanyId = companyid._id;
    if ((this.selectedCompanyId !== undefined && this.selectedCompanyId !=="")) {
      this.filter_data.companyid = this.selectedCompanyId;
      this.getInvoiceSummary();
    }
  }

  company_name_clear(ctrl: FormControl) {
    this.company_Name = [];
    ctrl.setValue("");
    this.selectedCompanyId = "";
    this.filter_data.companyid = '';
    this.getInvoiceSummary();
  }

  // =================================================

  getInvoiceSummary() {
    this.apiservice.getInvoiceSummary(this.filter_data).subscribe((res) => {
      if (res && res.status == true) {
        let invoice_details = res && res.invoice_details ? res.invoice_details : [];
        this.dataSource = new MatTableDataSource(invoice_details);
        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;
        const sortState: Sort = { active: "createdAt", direction: "" };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
      }
    })
  }

  getPayableAmount(element:any){
    const outstanding_amount = +(this.getOutstandingAmount(element));
    const interest = +(element && element.invoice_data && element.invoice_data.interest ? element.invoice_data.interest : 0);
    const discount = +(element && element.invoice_data && element.invoice_data.discount ? element.invoice_data.discount : 0);
    return (outstanding_amount + interest - discount);
  }

  getDate(date: any){
    return date && date != '' ? date : '';
  }

  getTotalAmount(element: any){
    const invoice_amount = element && element.invoice_data && element.invoice_data.invoice_amount ? element.invoice_data.invoice_amount : 0;
    const gst = element && element.invoice_data && element.invoice_data.bill_details && element.invoice_data.bill_details.gst_summary && element.invoice_data.bill_details.gst_summary.total_tax ? element.invoice_data.bill_details.gst_summary.total_tax : 0;
    const total = (+invoice_amount) + (+gst)
    return total;
  }

  getOutstandingAmount(element: any){
    const outstanding_amt = element && element.invoice_data && element.invoice_data.outstanding_amount ? element.invoice_data.outstanding_amount : 0;
    const tax_unpaid = element && element.invoice_data && element.invoice_data.tax_unpaid ? element.invoice_data.tax_unpaid : 0;
    const total = (+outstanding_amt) + (+tax_unpaid);
    return total;
  }

  numberformat(no: any) {
    return thousandsSeprator(no)
 }
}

