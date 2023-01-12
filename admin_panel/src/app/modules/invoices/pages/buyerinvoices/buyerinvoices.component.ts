import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ApiService } from '../../services/api/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';
import { CURRENCY_FORMAT, DATE_FORMAT } from 'src/app/shared/constants/constants';
import { formatDate } from '@angular/common';
import { CommentHistoryDailogComponent } from '../components/comment-history-dailog/comment-history-dailog.component';
import { AuditTrailComponent } from '../components/audit-trail/audit-trail.component';
@Component({
  selector: 'app-buyerinvoices',
  templateUrl: './buyerinvoices.component.html',
  styleUrls: ['./buyerinvoices.component.scss'],
  providers: [],
})
export class BuyerinvoicesComponent implements AfterViewInit {

  Date_Format = DATE_FORMAT;

  currency_format = CURRENCY_FORMAT;

  invoiceDate!: Date;

  paymentDate!: Date;

  companySelect: FormControl = new FormControl();

  company_Name!: any;

  selection = "";

  gstuserselect = "";

  invoiceNumber!: string;

  gstin!: string;

  invoice_due_in!: number;

  maxDate!: Date;

  filterInvoiceByDate: any;

  userType: any;

  selectedCompanyId: any;

  invoice_status!: any;

  invoice_type: string = '';

  displayedColumns: string[] = [
    "invoiceno",
    "invoice_type",
    "byuerCompany",
    "byuergstin",
    "selleCompany",
    "sellergstin",
    "invoice_date",
    "invoiceamount",
    "total_tax",
    "outstanding_amount",
    "invoiceduedate",
    "invoicestatus",
    "createdAt",
    "actions",
  ];
  dataSource = new MatTableDataSource([]);
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<BuyerinvoicesDialog>,
    public dialogRef2: MatDialogRef<CreditNoteSettlement>,
    private router: Router,
    private dialogRef1: MatDialogRef<CommentHistoryDailogComponent>,
  ) {}

  ngOnInit(): void {
    this.getInvoices();
    this.maxDate = new Date();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce("Sorting cleared");
    }
  }

  getInvoices() {
    this.apiService.getInvoices().subscribe((resp: any) => {
      if (resp && resp.status == true) {
        const invoices = resp.invoice ? resp.invoice : [];
        this.dataSource = new MatTableDataSource(invoices);
        this.dataSource.paginator = this.paginator;

        // this.sort.sort(({ id: 'createdAt', start: 'desc'}) as MatSortable);
        // this.dataSource.sort = this.sort;

        this.dataSource.sort = this.sort;
        const sortState: Sort = { active: "createdAt", direction: "desc" };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
      }
    });
  }

  // get Invoice Status
  getstatus(status: string): any {
    if (status == "Partpay") {
      return (status = "Part Pay");
    } else {
      return (status = status);
    }
  }

  openDialog(element: any) {
    this.dialogRef = this.dialog.open(BuyerinvoicesDialog, {
      data: {
        invoiceDetail: element,
      },
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.getInvoices();
    });
  }

  openCreditnote(element: any): void {
    this.dialogRef2 = this.dialog.open(CreditNoteSettlement, {
      data: {
        invoiceDetails: element,
      },
    });

    this.dialogRef2.afterClosed().subscribe(() => {
      this.getInvoices();
    });
  }
 

  editInvoice(invoice: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        invoiceid: JSON.stringify(invoice._id),
      },
    };
    this.router.navigate(["admin/invoices/invoicesdetails"], navigationExtras);
  }
  
  // audit trail dailog
  autidtrail(element:any){
    this.dialog.open(AuditTrailComponent, {
      data: element
    })
  }
  openCommentsDialog(comment:any) {
    let invoice_id = comment._id;
    this.dialogRef1 = this.dialog.open(CommentHistoryDailogComponent, {
      data: {
        invoice_id : invoice_id
      },
    });
  }

  getCompanyName(entity: any): string {
    return entity && entity.buyer && entity.buyer.company_name
      ? entity.buyer.company_name
      : "";
  }

  getSellerCompanyName(entity: any): string {
    return entity && entity.seller && entity.seller.company_name
      ? entity.seller.company_name
      : "";
  }

  getGSTnumber(entity: any) {
    return entity && entity.buyer && entity.buyer.gstin
      ? entity.buyer.gstin
      : "";
  }

  getSellerGSTnumber(entity: any) {
    return entity && entity.seller && entity.seller.gstin
      ? entity.seller.gstin
      : "";
  }

  getInvoiceNo(entity: any) {
    return entity && entity.invoice_number ? entity.invoice_number : "";
  }

  getInvoiceAmount(entity: any) {
    return entity && entity.invoice_amount ? entity.invoice_amount : "";
  }
  // ============================ filter invoices ================>

  filterInvoices() {
    let filterdata: any = [];
    if (this.invoiceNumber) {
      filterdata["invoiceNumber"] = this.invoiceNumber;
    }
    if (this.filterInvoiceByDate) {
      filterdata["filterInvoiceByDate"] = this.filterInvoiceByDate;
    }
    if (this.userType !== undefined && this.userType !=="") {
      filterdata["usertype"] = this.userType;
    }
    if (this.selectedCompanyId !== undefined && this.selectedCompanyId !=="") {
      filterdata["companyId"] = this.selectedCompanyId;
    }
    if (this.gstin !== undefined && this.gstin !=="") {
      filterdata["gstin"] = this.gstin;
    }
    if (this.gstuserselect !== undefined && this.gstuserselect !=="") {
      filterdata["gstuser"] = this.gstuserselect;
    }
    if (this.invoice_status) {
      filterdata["status"] = this.invoice_status;
    }
    if (this.invoice_due_in) {
      filterdata["days"] = this.invoice_due_in;
    }
    if(this.invoice_type){
      filterdata["invoice_type"] = this.invoice_type;
    }

    this.apiService.filterInvoices(filterdata).subscribe((response: any) => {
      if (response.status == true) {
        const invoices = response.invoice;
        this.dataSource = new MatTableDataSource(invoices);
        this.dataSource.paginator = this.paginator;

        // this.sort.sort(({ id: 'createdAt', start: 'desc'}) as MatSortable);
        // this.dataSource.sort = this.sort;

        this.dataSource.sort = this.sort;
        const sortState: Sort = { active: "createdAt", direction: "desc" };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
      } else {
        this.dataSource = new MatTableDataSource([]);
      }
    });
  }

  applyFilterInvoiceNo(invoiceno: any) {
    const filterValue = (invoiceno.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
    this.invoiceNumber = filterValue.toLocaleUpperCase();
    this.filterInvoices();
  }

  invoicedate() {
    this.filterInvoiceByDate = formatDate(
      this.invoiceDate,
      "yyyy-MM-dd",
      "en-US"
    );
    this.filterInvoices();
  }

  GstUserType(){
    if ((this.gstin !== undefined || this.gstin !=="") 
    &&  (this.gstuserselect !== undefined || this.gstuserselect !=="")) {
      this.filterInvoices();
    }
  }

  getGstNo(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
    this.gstin = filterValue.toLocaleUpperCase();
    if ((this.gstuserselect !== undefined || this.gstuserselect !=="")
    && (this.gstin !== undefined || this.gstin !=="")) {
      this.filterInvoices();
    }  
  }

  invoicestatusfilter(invoice_status: string) {
    this.invoice_status = invoice_status;
    this.filterInvoices();
  }
  // ========= dropdwon and auto suggetion =======
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
  
  selectUser(){
    this.userType = this.selection; 
     if ((this.userType !== undefined || this.userType !=="")
      && (this.selectedCompanyId !== undefined || this.selectedCompanyId !=="")) 
      {
        this.filterInvoices();
      }
  }

  selectInvoiceType(invoice_type: string){
    if(invoice_type != undefined && invoice_type != null){
      this.invoice_type = invoice_type;
      this.filterInvoices();
    }
  }

  getPosts(companyid: any) {
    this.userType = this.selection;
    this.selectedCompanyId = companyid._id;
    if ((this.selectedCompanyId !== undefined || this.selectedCompanyId !=="")
    && (this.userType !== undefined || this.userType !=="")) {
       this.filterInvoices();
    }
  }
  // ========== invoice due in ============

  invoicesByDueDate(invoiceDueIN: number) {
    this.invoice_due_in = invoiceDueIN;
    this.filterInvoices();
  }

  // ========= clear search boxes ==========
  invoiceNumberControl = new FormControl();
  gstControl = new FormControl();
  invoice_clear(ctrl: FormControl) {
    ctrl.setValue("");
    this.invoiceNumber = "";
    this.filterInvoices();
  }

  gst_clear(ctrl: FormControl) {
    ctrl.setValue("");
    this.gstuserselect = "";
    this.gstin = "";
    this.filterInvoices();
  }

  company_name_clear(ctrl: FormControl) {
    this.company_Name = [];
    ctrl.setValue("");
    this.selection = "";
    this.userType = "";
    this.selectedCompanyId = "";
    this.filterInvoices();
  }
}

@Component({
  selector: 'credit-note-settlement',
  templateUrl: 'credit-note-settlement.html',
  styleUrls: ['./buyerinvoices.component.scss'],
})
export class CreditNoteSettlement implements OnInit {

  displayedColumns: string[] = ['invoice_number', 'outstanding_amount', 'gst_settled', 'Amount_cleared', 'Remaing_oustanding'];

  CN_form!: FormGroup;

  date_format = DATE_FORMAT;

  dataSource = new MatTableDataSource([]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private dialogRef2: MatDialogRef<CreditNoteSettlement>,
    public dialogRef3: MatDialogRef<AddInvoice>
  ) {
    console.log("data : ", data);
  }

  ngOnInit(): void {
    this.CN_form = this.fb.group({
      Comment: ""
    });
    this.getSettledInvoicesByCreditNoteID();
  }

  getSettledInvoicesByCreditNoteID(){
    const body = {
      'buyerid' : this.data.invoiceDetails.buyer._id,
      'sellerid' : this.data.invoiceDetails.seller._id,
      'creditnoteid' : this.data.invoiceDetails._id
    }
    this.apiService.getSettledInvoicesByCreditNoteID(body).subscribe((resps: any) => {
      if(resps && resps.status && resps.status == true){
        this.dataSource = new MatTableDataSource(resps.invoices);
      }
    })
  }

  onSubmit(){
    const body = {
      'buyerid' : this.data.invoiceDetails.buyer._id,
      'sellerid' : this.data.invoiceDetails.seller._id,
      'creditnoteid' : this.data.invoiceDetails._id
    }
    this.apiService.settleInvoicesByCreditNoteID(body).subscribe((res:any) => {
      if(res && res.status && res.status == true){
      }else{
      }
      this.dialogRef2.close();
    })
  }


  cancel2() {
    this.dialogRef2.close();
  }


  openAddinvoice(): void {
 
    this.dialogRef3 = this.dialog.open(AddInvoice, {
   
    });  
  }

}



@Component({
  selector: 'add-invoice',
  templateUrl: 'add-invoice.html',
  styleUrls: ['./buyerinvoices.component.scss'],
})
export class AddInvoice implements OnInit {

  date_format = DATE_FORMAT;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'oamount'];
  dataSource = ELEMENT_DATA;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private dialogRef2: MatDialogRef<CreditNoteSettlement>,
    public dialogRef3: MatDialogRef<AddInvoice>,

  ) {}



  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  cancel3() {
    this.dialogRef3.close();
  }


  

}



@Component({
  selector: 'buyerinvoices-dialog',
  templateUrl: 'buyerinvoices-dialog.html',
  styleUrls: ['./buyerinvoices.component.scss'],
})
export class BuyerinvoicesDialog implements OnInit {

  date_format = DATE_FORMAT;

  delete_form!: FormGroup;

  durationInSeconds = 2;

  userid!: any;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.delete_form = this.fb.group({
      comment: ["", [Validators.required]],
    });
    this.userid = sessionStorage.getItem("LoginId");
  }

  delcomment() {
    if (this.delete_form.valid) {
      const comment = this.delete_form.value.comment;

      this.apiService
        .deleteInvoice(this.data.invoiceDetail._id, this.userid, comment)
        .subscribe((resp: any) => {
          if (resp.status == true) {
            this.snackBar.open("Invoice deleted successfully.", "Close", {
              duration: this.durationInSeconds * 3000,
              panelClass: ["error-dialog"],
            });
            this.dialog.closeAll();
          } else {
            this.snackBar.open(
              "An error occured, please try again later.",
              "Close",
              {
                duration: this.durationInSeconds * 3000,
                panelClass: ["error-dialog"],
              }
            );
            this.dialog.closeAll();
          }
        });
    }
  }

  cancel() {
    this.dialog.closeAll();
  }
}



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  oamount:string;
  action:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', oamount: 'H', action: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', oamount: 'H', action: 'H'},
 
];
