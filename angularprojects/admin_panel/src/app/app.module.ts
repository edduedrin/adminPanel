import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MaterialExampleModule } from "./material.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CompanyRoutingModule } from "./modules/company/company-routing.module";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatDialogRef,MatDialogModule } from "@angular/material/dialog";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "src/environments/environment.prod";
import { MatTableModule } from "@angular/material/table";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,

    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the app is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000',
    // }),

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    CoreModule,
    SharedModule,
    MatTableModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
