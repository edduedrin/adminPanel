import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, MatSortable, Sort } from "@angular/material/sort";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ApiService } from "../../services/api/api.service";
import { NavigationExtras, Router } from "@angular/router";
import { DATE_FORMAT } from "src/app/shared/constants/constants";
import { FormControl, FormGroup } from "@angular/forms";
import { formatDate } from "@angular/common";
import { CommentHistoryDailogComponent } from "../components/comment-history-dailog/comment-history-dailog.component";

@Component({
  selector: "app-companylist",
  templateUrl: "./companylist.component.html",
  styleUrls: ["./companylist.component.scss"],
  providers: [],
})

export class CompanylistComponent implements AfterViewInit {

  Date_Format = DATE_FORMAT;

  changeText: boolean = false;

  createdAt = ""; //Registered date

  companyList: any = {};

  companySelect: FormControl = new FormControl();

  company_Name!: any;

  maxDate!: Date;

  creatidlimitflag = false;

  userRole = sessionStorage.getItem("Role");

  displayedColumns: string[] = [
    "company_name",
    "companyaddress",
    "gstin",
    "kyc_document_upload",
    "status",
    "createdAt",
    "actions",
  ];
  dataSource = new MatTableDataSource([]);

  company_status: any;

  toDate: any;

  fromDate: any;
  
  gstin = "";
  selection = "";
  selectedCompanyId: any;

  ngOnInit(): void {
    this.getCompanyList();
    this.maxDate = new Date();
    if (this.userRole == "xuritiCreditMgr") {
      this.creatidlimitflag = true;
    }
  }

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    public dialog: MatDialog,
    private apiService: ApiService,
    private dialogRef1: MatDialogRef<CommentHistoryDailogComponent>, 
  ) {}

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showAllCompany(event: Event) {
    const gst = (event.target as HTMLInputElement).value;
    if (gst == "") {
      this.getCompanyList();
    }
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

  getCompanyList() {
    this.apiService
      .getCompanyList(this.gstin, this.createdAt)
      .subscribe((response: any) => {
        if (response && response.status == true) {
          this.companyList =
            response && response.companies ? response.companies : [];
          this.dataSource = new MatTableDataSource(this.companyList);
          this.dataSource.paginator = this.paginator;

          // this.sort.sort(({ id: 'created', start: 'desc'}) as MatSortable);
          // this.dataSource.sort = this.sort;

          this.dataSource.sort = this.sort;
          const sortState: Sort = { active: "createdAt", direction: "desc" };
          this.sort.active = sortState.active;
          this.sort.direction = sortState.direction;
          this.sort.sortChange.emit(sortState);
        } else {
          this.dataSource = new MatTableDataSource();
        }
      });
  }

  editCompany(element: any) {
    const companyId = element._id;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        companyid: JSON.stringify(companyId),
      },
    };
    this.router.navigate(
      [`admin/companies/${companyId}/companydetails`],
      navigationExtras
    );
  }

  companyKycDetails(element: any) {
    const companyId = element._id;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        companyid: JSON.stringify(companyId),
      },
    };
    this.router.navigate(
      [`admin/companies/${companyId}/kycdetails`],
      navigationExtras
    );
  }

  companyGSTDetails(element: any) {
    const gst = element.gstin;
    const companyId = element._id;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        gst: JSON.stringify(gst),
      },
    };
    this.router.navigate(
      [`admin/companies/${companyId}/gstdetails`],
      navigationExtras
    );
  }

  openCreditApprovalPage() {
    this.router.navigate([`admin/companies/creditlimitverification`]);
  }

  companyCreditPlan(element: any) {
    this.router.navigate([`admin/companies/${element._id}/creditplanslist`]);
  }

  openDialog() {
    this.dialog.open(CompanyapproveDialog);
  }

  // =========== company filter ===========

  filterEntities() {
    let filterdata: any = [];

    if (this.gstin) {
      filterdata["gstin"] = this.gstin;
    }
    if (this.company_status) {
      filterdata["status"] = this.company_status;
    }
    if (this.toDate) {
      filterdata["to"] = this.toDate;
    }
    if (this.fromDate) {
      filterdata["from"] = this.fromDate;
    }
    if (this.company_Name) {
      filterdata["company_name"] = this.company_Name;
    }

    this.apiService.filterentities(filterdata).subscribe((response: any) => {
      if (response.status == true) {
        this.companyList =
          response && response.companies ? response.companies : [];
        this.dataSource = new MatTableDataSource(this.companyList);
        this.dataSource.paginator = this.paginator;

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

  filterbygstno(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
    this.gstin = filterValue.toLocaleUpperCase();
    this.filterEntities();
  }

  companiesByStatus(event: string) {
    const filterValue = event;
    this.company_status = filterValue;
    this.filterEntities();
  }

  datefilter() {
    const start = this.dateRange.value.start;
    const end = this.dateRange.value.end;

    this.fromDate = formatDate(start, "yyyy-MM-dd", "en-US");
    this.toDate = formatDate(end, "yyyy-MM-dd", "en-US");
    this.filterEntities();
  }

  // =========== company filter by company name ========

  filterCompanyName(company_name: any) {
    const filterValue = (company_name.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
    this.company_Name = filterValue.toLocaleUpperCase();
    this.filterEntities();
  }

  companyNameControl = new FormControl("");
  gstControl = new FormControl();

  clear(ctrl: FormControl) {
    ctrl.setValue("");
    this.company_Name = "";
    this.filterEntities();
  }

  gstclear(ctrl: FormControl) {
    ctrl.setValue("");
    this.gstin = "";
    this.filterEntities();
  }

  openCommentsDialog(comment:any) {
    let obj = {
      company_id : comment._id,
      gst: comment.gstin
    }
    this.dialogRef1 = this.dialog.open(CommentHistoryDailogComponent, {
      data: {
        object: obj
      },
    });
  }
}

@Component({
  selector: "companyapprove-dialog",
  templateUrl: "companyapprove-dialog.html",
  styleUrls: ["./companylist.component.scss"],
})
export class CompanyapproveDialog implements OnInit {
  constructor() {}

  ngOnInit() {}
}
