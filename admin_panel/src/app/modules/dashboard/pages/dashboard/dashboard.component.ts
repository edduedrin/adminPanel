import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { CURRENCY_FORMAT } from 'src/app/shared/constants/constants';
import { thousandsSeprator } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  currency_format = CURRENCY_FORMAT;

  total_invoice_uploaded: number = 0;

  total_invoice_pending: number = 0;

  total_invoice_draft: number = 0;

  total_invoice_value: number = 0;

  total_invoice_received: number = 0;

  total_invoice_due: number = 0;

  total_companies_onboarded: number = 0;

  total_companies_hold: number = 0;

  total_nbfc_onboarded: number = 0;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    public dialog: MatDialog,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getDashboard();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = [
    "comapny",
    "creditLimit",
    "creditutilize",
    "available_credit_limit",
    "invoice_processed",
    "count_pending",
    "count_confirmed_partpay",
    "countOverdue",
  ];

  dataSource = new MatTableDataSource([]);

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce("Sorting cleared");
    }
  }

  getTotalInvoiceUploaded() {
    this.apiService.getTotalInvoice().subscribe((respon: any) => {
      if (respon && respon.status == true) {
        this.total_invoice_uploaded = respon.invoice_details
          ? respon.invoice_details.length
          : 0;
      }
    });
  }

  getTotalPendingInvoice() {
    this.apiService.getPendingInvoice().subscribe((respo: any) => {
      if (respo && respo.status == true) {
        this.total_invoice_pending = respo.invoice_details
          ? respo.invoice_details.length
          : 0;
      }
    });
  }

  getTotalDraftInvoice() {
    this.apiService.getDraftInvoice().subscribe((respo: any) => {
      if (respo && respo.status == true) {
        this.total_invoice_draft = respo.invoice_details
          ? respo.invoice_details.length
          : 0;
      }
    });
  }

  getTotalInvoiceValue() {
    this.apiService.getTotalInvoiceAmt().subscribe((respon: any) => {
      if (respon && respon.status == true) {
        this.total_invoice_value =
          respon.payment_details && respon.payment_details[0].outstanding_amount
            ? respon.payment_details[0].outstanding_amount
            : 0;
      }
    });
  }

  getTotalPaymentRecieved() {
    this.apiService.getPaymentRecieved().subscribe((respon: any) => {
      if (respon && respon.status == true) {
        this.total_invoice_received =
          respon.payment_details && respon.payment_details[0].settle_amount
            ? respon.payment_details[0].settle_amount
            : 0;
      }
    });
  }

  getTotalPaymentDue() {
    this.apiService.getPaymentDue().subscribe((respon: any) => {
      if (respon && respon.status == true) {
        this.total_invoice_due =
          respon.payment_details && respon.payment_details[0].outstanding_amount
            ? respon.payment_details[0].outstanding_amount
            : 0;
      }
    });
  }

  getCompaniesOnboarded() {
    this.apiService.getCompaniesOnboarded().subscribe((resp: any) => {
      if (resp && resp.status == true) {
        this.total_companies_onboarded = resp.count ? resp.count : 0;
      }
    });
  }

  getHoldCompanies() {
    this.apiService.getCompaniesPending().subscribe((resp: any) => {
      if (resp && resp.status == true) {
        this.total_companies_hold = resp.count ? resp.count : 0;
      }
    });
  }

  getNBFCOnboarded() {
    this.apiService.getNBFCOnboarded().subscribe((resp: any) => {
      if (resp && resp.status == true) {
        this.total_nbfc_onboarded = resp.count ? resp.count : 0;
      }
    });
  }

  getDashboard() {
    // this.apiService.getdashbord().subscribe((res) => {
    //   if (res && res.status == true) {
    //     let list_of_companies = res && res.company_list ? res.company_list : [];
    //     this.dataSource = new MatTableDataSource(list_of_companies);
    //     this.dataSource.paginator = this.paginator;

    //     this.dataSource.sort = this.sort;
    //     const sortState: Sort = { active: "creditLimit", direction: "desc" };
    //     this.sort.active = sortState.active;
    //     this.sort.direction = sortState.direction;
    //     this.sort.sortChange.emit(sortState);
    //   }
    // })
    this.getTotalInvoiceUploaded();
    this.getTotalPendingInvoice();
    this.getTotalDraftInvoice();
    this.getTotalInvoiceValue();
    this.getTotalPaymentRecieved();
    this.getTotalPaymentDue();
    this.getCompaniesOnboarded();
    this.getHoldCompanies();
    this.getNBFCOnboarded();
  }

  numberformat(no: any) {
    return thousandsSeprator(no);
  }
}
