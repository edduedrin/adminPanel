import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "../../services/api/api.service";
import { FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";

export interface State {
  name: string;
}

@Component({
  selector: "app-reconciliation",
  templateUrl: "./reconciliation.component.html",
  styleUrls: ["./reconciliation.component.scss"],
  providers: [],
})
export class ReconciliationComponent implements AfterViewInit {

  nbfc_id!: string;

  nbfc_name!: string;

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  durationInSeconds = 2;

  fromDate!: any;

  toDate!: any;

  maxDate!: Date;

  from_year = "";
  from_month = "";
  from_day = "";

  to_year = "";
  to_month = "";
  to_day = "";

  stateCtrl = new FormControl();

  clear(ctrl: FormControl) {
    ctrl.setValue(null);
  }

  ngAfterViewInit() {}

  constructor(
    private apiservice: ApiService, 
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    // private router: Router,
    ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.nbfc_id = JSON.parse(params["nbfcid"]);
    });
    if(this.nbfc_id && this.nbfc_id != '' && this.nbfc_id != null && this.nbfc_id != undefined){
      this.getNBFCdetailsById(this.nbfc_id)
    }
    this.maxDate = new Date();
  }

  getNBFCdetailsById(nbfcid: string){
    this.apiservice.getNBFCDetailsByNBFCid(nbfcid).subscribe((re: any) => {
      if(re && re.status == true){
        this.nbfc_name = re.nbfc && re.nbfc[0].company && re.nbfc[0].company.nbfc_name ? re.nbfc[0].company.nbfc_name : '';
      }
    })
  }

  // ========== date range filter ==============>

  dateRangeVal() {
    let start = this.dateRange.value.start;
    let end = this.dateRange.value.end;
    // this.fromDate = formatDate(start, 'yyyy-MM-dd', 'en-US');
    // this.toDate   = formatDate(end, 'yyyy-MM-dd', 'en-US');

    this.from_year = start.getFullYear();
    this.from_month = start.getMonth();
    this.from_day = start.getDate();

    this.to_year = end.getFullYear();
    this.to_month = end.getMonth();
    this.to_day = end.getDate();
  }

  downloadFile() {
    if(this.dateRange.valid){
      const body = {
        from_year: this.from_year,
        from_month: this.from_month,
        from_day: this.from_day,
  
        to_year: this.to_year,
        to_month: this.to_month,
        to_day: this.to_day,
      };
      this.apiservice.NBFCBuyerReconciliation(body).subscribe((resp: any) => {
        if (resp && resp.status == true) {
          this.apiservice.downloadFile(resp.key).subscribe((resp: any) => {
          });
        } else {
          this.snackBar.open(resp.message, "Close", {
            duration: this.durationInSeconds * 3000,
            panelClass: ["error-dialog"],
          });
        }
      });
    }else{
      this.snackBar.open("Please select the date range", "Close", {
        duration: this.durationInSeconds * 3000,
        panelClass: ["error-dialog"],
      });
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0 && event.target.files[0].size <= '5242880') {
      const file = event.target.files[0]; //Call api

      const formData: FormData = new FormData();
      formData.append("file", file);

      this.apiservice.sendBuyerReconciliation(formData, this.nbfc_id).subscribe((response:any) => {
        if(response && response.status == true){
          this.snackBar.open(response.message, "Close", {
            duration: this.durationInSeconds * 3000,
            panelClass: ["error-dialog"],
          });
        }else{
          this.snackBar.open(response.message, "Close", {
            duration: this.durationInSeconds * 3000,
            panelClass: ["error-dialog"],
          });
        }
        (<HTMLInputElement>document.getElementById('buyer_reconciliation')).value = "";
      })
      // this.payment_receipt = file;
    }else{
      this.snackBar.open("File size cannot be greater than 5MB.", "Close", {
        duration: this.durationInSeconds * 3000,
        panelClass: ["error-dialog"],
      });
      (<HTMLInputElement>document.getElementById('buyer_reconciliation')).value = "";
    }
  }
}

@Component({
  selector: "reconciliation-dialog",
  templateUrl: "reconciliation-dialog.html",
  styleUrls: ["./reconciliation.component.scss"],
})
export class ReconciliationDialog implements OnInit {
  constructor() {}

  ngOnInit() {}
}
