import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialExampleModule } from "../../material.module";
import { CompanyRoutingModule } from "./company-routing.module";
import { CoreModule } from "../../core/core.module";
import { CompanyErrorComponent } from "./pages/components/company-error/company-error.component";
import {
  CompanylistComponent,
  CompanyapproveDialog,
} from "./pages/companylist/companylist.component";
import {
  CompanydetailsComponent,
  CompanydetailsapproveDialog,
  CompanydetailseditDialog,
  CompanydetailsdeleteDialog,
} from "./pages/companydetails/companydetails.component";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SharedModule } from "src/app/shared/shared.module";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ApiService } from "./services/api/api.service";
import {
  CreditplansComponent,
  CreditplansDialog,
} from "./pages/creditplans/creditplans.component";
import {
  CreditplanslistComponent,
  CreditplanslistDialog,
  CreditplansmappingDialog,
} from "./pages/creditplanslist/creditplanslist.component";
import { MultiselectAutocompleteComponent } from "./pages/components/multiselect-autocomplete/multiselect-autocomplete.component";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { CreditlimitverificationComponent } from "./pages/creditlimitverification/creditlimitverification.component";
import { CreditlimithistoryComponent } from "./pages/creditlimithistory/creditlimithistory.component";
import { KycDetails } from "./pages/kyc-screen/kyc-screen.component";
import { GSTDetails } from "./pages/gst-screen/gst-screen.component";
import { OfflinepaymentComponent } from "./pages/offlinepayment/offlinepayment.component";
import { PaymentSummeryComponent } from "./pages/components/payment-summery/payment-summery.component";
import { EsignComponent } from "./pages/esign/esign.component";
import { CommentHistoryDailogComponent } from './pages/components/comment-history-dailog/comment-history-dailog.component';
@NgModule({
  declarations: [
    CompanylistComponent,
    CreditlimitverificationComponent,
    CompanydetailsComponent,
    CompanyapproveDialog,
    CreditplansComponent,
    CreditplansDialog,
    CreditplanslistComponent,
    CreditplanslistDialog,
    CreditplansmappingDialog,
    CompanydetailsapproveDialog,
    CompanydetailseditDialog,
    CompanydetailsdeleteDialog,
    GSTDetails,
    OfflinepaymentComponent,
    EsignComponent,
    PaymentSummeryComponent,
    CompanyErrorComponent,
    MultiselectAutocompleteComponent,
    CreditlimithistoryComponent,
    KycDetails,
    CommentHistoryDailogComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MaterialExampleModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CompanyRoutingModule,
    MatTableExporterModule,
    SharedModule,
    FormsModule,
    MatFormFieldModule,
  ],
  providers: [
    ApiService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" },
  ],
})
export class CompanyModule {}
