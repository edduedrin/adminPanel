import { AfterViewInit, Component, Inject, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, MatSortable, Sort } from "@angular/material/sort";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { User } from "src/app/shared/interfaces/entities/user.interface";
import { ApiService } from "../../services/api/api.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  CURRENCY_FORMAT,
  DATE_FORMAT,
  LOCAL_STORAGE_AUTH_DETAILS_KEY,
} from "src/app/shared/constants/constants";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-manage-collection",
  templateUrl: "./manage-collection.component.html",
  styleUrls: ["./manage-collection.component.scss"],
  providers: [],
})
export class ManageCollectionComponent implements AfterViewInit {

  Date_Format = DATE_FORMAT;

  currency_format = CURRENCY_FORMAT;

  editflag!:boolean

  advisor_name!:string

  login_user_id!:string;

  selection = "";
    
  colletion_id!: string;

  collection_status = "";

  payment_status = "Paid"

  overdue_invoice_details!: any;

  comment_form!: FormGroup;

  userSelect: FormControl = new FormControl();

  displayedColumns: string[] = [
    "transactionID",
    "invoice_number",
    "seller_name",
    "amount",
    "pstatus",
    "createdAt",
  ];

   // comment history 
   dataSource1 = new MatTableDataSource([]);

   displayedColumns1: string[] = [
     "comment",
     "collection_status", 
     "commented_by",
     "createdAt", 
   ];

  dataSource = new MatTableDataSource([]);

  @ViewChild('paginator') paginator!: MatPaginator;

  @ViewChild('paginator1') paginator1!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;
  invoiceid: any;
  collection_advisor_id: any;
  durationInSeconds = 2;
  comment_List!: any[];
  invoiceDetails: any;
  collection_advisor_data!: any[];
  login_user_role!: string | null;
  waiver_flag: boolean = false
  
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<InvoiceWaiverDialog>,
    private router: Router,
    private route: ActivatedRoute
  ) 
  {  
    this.login_user_role = sessionStorage.getItem("Role");
   if (this.login_user_role !== ("xuritiCollectionMgr" || "xuritiCollectionStaff")) {
      this.editflag = true;
   }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.colletion_id = JSON.parse(params["id"]);
    });
    if (
      this.colletion_id &&
      this.colletion_id != null &&
      this.colletion_id != undefined
    ) {
      this.getOverdueInvoiceDetails();
    }

    this.comment_form = this.fb.group({
      comment: [""],
    });

    this.getCollectonUserAdvisor();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource1.paginator = this.paginator1;
    this.dataSource1.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this._liveAnnouncer.announce("Sorting cleared");
    }
  }

  getOverdueInvoiceDetails() {
    this.apiService
      .getOverdueInvoiceDetailsById(this.colletion_id)
      .subscribe((response: any) => {
        if (response && response.status == true) {
          this.overdue_invoice_details = response.overdue_invoices;
          this.invoiceDetails = response.invdetails;
          this.collection_status = this.overdue_invoice_details.collection_status;
          this.invoiceid = this.overdue_invoice_details.invoice._id;
          if(this.editflag){
            this.advisor_name = this.overdue_invoice_details && this.overdue_invoice_details.collection_advisor && this.overdue_invoice_details.collection_advisor.name ? this.overdue_invoice_details.collection_advisor.name : 'Advisor Not Selected';
          }
          else{
          this.advisor_name = this.overdue_invoice_details && this.overdue_invoice_details.collection_advisor && this.overdue_invoice_details.collection_advisor.name ? this.overdue_invoice_details.collection_advisor.name : 'Select Collection Advisor';
           console.log("advisorname:",this.advisor_name);
          if (this.advisor_name == "Select Collection Advisor")
           {
            this.waiver_flag = false
           }
          else{
             this.waiver_flag = true
           }
          }
          this.collection_advisor_id = this.overdue_invoice_details && this.overdue_invoice_details.collection_advisor && this.overdue_invoice_details.collection_advisor._id ? this.overdue_invoice_details.collection_advisor._id : '';
          this.getPaymentHistory();
          this.dataSource1 = new MatTableDataSource(this.overdue_invoice_details.comments);
          this.dataSource1.paginator = this.paginator1;

          this.dataSource.sort = this.sort;
          const sortState: Sort = { active: "createdAt", direction: "desc" };
          this.sort.active = sortState.active;
          this.sort.direction = sortState.direction;
          this.sort.sortChange.emit(sortState);
        }
      });
  }

  openWaiverDialog() {
    const dialogRef = this.dialog.open(InvoiceWaiverDialog, {
      data: {
        overdue_invoice_details: this.overdue_invoice_details,
        invoiceDetails: this.invoiceDetails,
        colletion_id: this.colletion_id,
        userID: sessionStorage.getItem("LoginId")
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  getPaymentHistory() {
    this.apiService.getPaymentHistory(this.invoiceid).subscribe((res: any) => {
      if (res.status == true) {
        this.dataSource = res.payment_history;
        this.dataSource = new MatTableDataSource(res.payment_history);
        this.dataSource.paginator = this.paginator;
         
        //  Data sorting
        this.dataSource.sort = this.sort;
        const sortState: Sort = { active: "createdAt", direction: "desc" };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
      }
      else {
        this.dataSource = new MatTableDataSource([]);
      }
    })
  }

  openDialog(user: any) {
  }

  // compny_mapping dailog

  company_Mapping(staffid: string) {
    const id = staffid != undefined && staffid != null ? staffid : "";
    let navigationExtras: NavigationExtras = {
      queryParams: {
        staffId: JSON.stringify(staffid),
      },
    };
    this.router.navigate(["over-due-invoices/mapping"], navigationExtras);
  }

  updateOverDueInvoice() {
    if (this.collection_advisor_id == "") 
    {
      this.snackBar.open(
                "Please Select Collection advisor",
                "Close",
               {
                  duration: this.durationInSeconds * 3000,
                  panelClass: ["error-dialog"],
               });  
    }
    else
    { 
      this.waiver_flag = true;
      if (this.comment_form.valid) {
        let update_data = {
          collection_status: this.collection_status,
          comment: this.comment_form.value.comment,
          collection_advisor_id: this.collection_advisor_id,
        }
        this.apiService.updateOverDueInvoice(update_data, this.colletion_id).subscribe((res: any) => {
          if (res.status == true) {
            this.snackBar.open(
              res.message,
              "Close",
              {
                duration: this.durationInSeconds * 3000,
                panelClass: ["error-dialog"],
              }
            );
            this.router.navigate(['admin/collection']);
          }
          else {
            this.snackBar.open(
              res.message,
              "Close",
              {
                duration: this.durationInSeconds * 3000,
                panelClass: ["error-dialog"],
              }
            );
          }
        })
      }
    } 
  }

  getCollectonUserAdvisor() {
      this.apiService
        .getCollectionStaff()
        .subscribe((res) => {
          this.collection_advisor_data = [...res.userlist];
      });
  }
  
  getClStaff(val:any){
      if (!val) {
         this.collection_advisor_id = "";
          }
      else {
        this.collection_advisor_id = val._id;
      }
  }
}

@Component({
  selector: "invoice-waiver-dialog",
  templateUrl: "invoice-waiver-dialog.html",
  styleUrls: ["./manage-collection.component.scss"],
})
export class InvoiceWaiverDialog implements AfterViewInit {

  currency_format = CURRENCY_FORMAT;

  editflag!:boolean;

  payableAmount: any;

  fullAmountPayflag = true;

  waiver_Amount!: any;

  partPay!: any;

  partpayerrorflag = false;
  
  error_flag = false;

  input_check_flag = false

  intrest_check_error_flag = false;

  displayedColumns: string[] = [
    "inumber",
    "iamount",
    "cleared_amount",
    "waiver",
    "status",
    "date",
  ];

  dataSource = new MatTableDataSource([]);
  durationInSeconds = 2;
  login_user_role: string | null;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogueRef: MatDialogRef<InvoiceWaiverDialog>,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.login_user_role = sessionStorage.getItem("Role");
    if (this.login_user_role !== ("xuritiCollectionMgr" || "xuritiCollectionStaff")) {
       this.editflag = true;
    }
    }

  ngOnInit() {
    this.getWaiverPaymentHistory();
    this.payableAmount = this.data.invoiceDetails.total_outstanding_amount;
    this.data.invoiceDetails.interest = +(this.data.invoiceDetails.interest).toFixed(2);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
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

  waiver_amount() {
    this.waiver_Amount = (+this.waiver_Amount).toFixed(2);
    this.data.invoiceDetails.interest = parseFloat(this.data.invoiceDetails.interest);
    if (this.fullAmountPayflag == true) {
      if (this.waiver_Amount > this.data.invoiceDetails.interest ) {
        this.intrest_check_error_flag = true;
        this.error_flag = true;
      }
      else {
        this.intrest_check_error_flag = false;
        this.error_flag = false;
      }
    }
    else if (this.fullAmountPayflag == false) {
      if (this.waiver_Amount > this.data.invoiceDetails.interest) {
        this.intrest_check_error_flag = true;
        this.error_flag = true;
      }
      else{
        this.intrest_check_error_flag = false;
        this.error_flag = false;
      }
    }
  }
    
  checkInputValue(value: any) {
    let filterValue = (value.target as HTMLInputElement).value;
    if (!filterValue.match(/^[0-9.]*$/)) {
      this.input_check_flag = true
    }

    else {
      this.input_check_flag = false
    }
  }

  getWaiverPaymentHistory() {
    let invoiceid = this.data.overdue_invoice_details.invoice._id;
    this.apiService.getwaiverPaymentHistory(invoiceid).subscribe((res: any) => {
      if (res.status == true) {
        this.dataSource = new MatTableDataSource(res.payment_history);
        this.dataSource.paginator = this.paginator;
      }
      else {
        this.dataSource = new MatTableDataSource([]);
      }
    })
  }

  sharePaymentlink() {
    let body:any ={}
    if ((this.fullAmountPayflag == true) && (this.intrest_check_error_flag == false)) {
      if (!this.waiver_Amount) {
        body.collectionID = this.data.colletion_id;
        body.orderAmount = this.data.invoiceDetails.total_outstanding_amount;
        body.waver = "0";
        body.interest =  this.data.invoiceDetails.interest;
        body.full_payment = true;
      } 
      else{
        body.collectionID = this.data.colletion_id;
        body.orderAmount = this.data.invoiceDetails.total_outstanding_amount;
        body.waver = this.waiver_Amount;
        body.interest =  this.data.invoiceDetails.interest;
        body.full_payment = true;
      }
      this.apiService.waiverPayment(body).subscribe((res: any) => {
        if (res.status == true) {
          this.snackBar.open(
            res.message,
            "Close",
            {
              duration: this.durationInSeconds * 3000,
              panelClass: ["error-dialog"],
            }
          );
          this.dialogueRef.close();
        }
        else{
          this.snackBar.open(
            res.message,
            "Close",
            {
              duration: this.durationInSeconds * 3000,
              panelClass: ["error-dialog"],
            }
          );
        }
    })
    }

    else if ((this.fullAmountPayflag == false) && (this.intrest_check_error_flag == false) && (this.partpayerrorflag == false)) {
      if (!this.partPay) {
        this.snackBar.open(
          "Please enter part pay amount",
          "Close",
          {
            duration: this.durationInSeconds * 3000,
            panelClass: ["error-dialog"],
          }
        );
      } 
      else if (!this.waiver_Amount) {
        body.collectionID = this.data.colletion_id;
        body.orderAmount = this.partPay;
        body.waver = "0";
        body.interest =  this.data.invoiceDetails.interest;
        body.full_payment = false;
      }
      else{
         body.collectionID = this.data.colletion_id;  
         body.orderAmount = this.partPay;
         body.waver = this.waiver_Amount;
         body.interest = this. data.invoiceDetails.interest;
         body.full_payment = false;
      }

      this.apiService.waiverPayment(body).subscribe((res: any) => {
        if (res.status == true) {
          this.snackBar.open(
            res.message,
            "Close",
            {
              duration: this.durationInSeconds * 3000,
              panelClass: ["error-dialog"],
            }
          );
          this.dialogueRef.close()
        }
        else{
          this.snackBar.open(
            res.message,
            "Close",
            {
              duration: this.durationInSeconds * 3000,
              panelClass: ["error-dialog"],
            }
          );
        }
      })
    }
  }

  onEnterPartPay(amount: any) {
    this.partPay = this.partPay;
    this.data.invoiceDetails.total_outstanding_amount = parseFloat(this.data.invoiceDetails.total_outstanding_amount);

    this.partPay = (+this.partPay).toFixed(2);
    
    if ( this.partPay > this.data.invoiceDetails.total_outstanding_amount ) 
    {
      this.partpayerrorflag = true;
      this.error_flag = true
    }

    else
    {
      this.partpayerrorflag = false;
      this.error_flag = false;
      this.partPay = (amount.target as HTMLInputElement).value;
      this.partPay = (+this.partPay).toFixed(2)
    }
  }

  onSelectCompleteAmount(flag: boolean) {
    this.fullAmountPayflag = flag;
    if (this.fullAmountPayflag == true) {
      this.partPay = 0;
    }
  }
}

