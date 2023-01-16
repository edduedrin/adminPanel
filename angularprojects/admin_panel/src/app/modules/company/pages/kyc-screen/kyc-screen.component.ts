import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormArray, FormBuilder } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatLabel } from "@angular/material/form-field";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../services/api/api.service";

@Component({
  selector: "app-new-screen",
  templateUrl: "./kyc-screen.component.html",
  styleUrls: ["./kyc-screen.component.scss"],
})
export class KycDetails implements OnInit {
  // ================
  panUrl:any = [];
  addressUrl: any = [];
  businessUrl: any = [];

  financialUrl: any = [];

  vintageUrl: any = [];
  gstUrl: any = [];
  partnershipUrl: any = [];
  ownershipUrl: any = [];
  bankingUrl: any = [];
  doc1: any = [];
  doc2: any = [];
  doc3: any = [];

  financial_and_gstReturns_form: FormGroup = this.fb.group({
    financial_doc_1: "",
    doc_file_1: [""],
    financial_doc_2: "",
    doc_file_2: [""],
    financial_doc_3: "",
    doc_file_3: [""],
  });

  kycForm = this.fb.group({
    panDetails: this.fb.group({
      panNumber: ["", [Validators.required, Validators.pattern]],
      documentList: [""],
    }),

    AddressProof: this.fb.group({
      addressDocType: ["", [Validators.required]],
      addressDocNumber: ["", [Validators.required, Validators.pattern]],
      documentList: [""],
    }),
    businessProof: this.fb.group({
      businessDocType: ["", [Validators.required]],
      businessDocNumber: "",
      documentList: [""],
    }),
    ownershipProof: this.fb.group({
      ownershipDocType: "",
      ownershipDocNumber: "",
      documentList: [""],
    }),
    bankingDetails: this.fb.group({
      documentList: [""],
    }),
    vintageProof: this.fb.group({
      businessvintageProof: "",
      documentList: [""],
    }),
    partnershipDetails: this.fb.group({
      documentList: [""],
    }),
    financialDetails: this.fb.group({
      financial_doc_1: "",
      doc_file_1: [""],
      financial_doc_2: "",
      doc_file_2: [""],
      financial_doc_3: "",
      doc_file_3: [""],
      gstDocList: [""],
    }),
  });

  // ================

  urls = new Array<string>(); 

  srcResult: any;
  panDetailsLink: any;
  addressProofLink: any;
  businessProofLink: any;
  ownershipProofLink: any;
  VintageProofLink: any;
  PartnershipLink: any;
  BankStatementDetailsLink: any;
  FinancialDetailsLink: any;
  GstDetailsLink: any;
  durationInSeconds = 2;

  onFileSelected() {
    const inputNode: any = document.querySelector("#file");

    if (typeof FileReader !== "undefined") {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  public data: any;
  companyDetail: any;
  fetchGst() {}
  addOnBlur = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute, 
    private router:Router,
    private apiservice: ApiService,
    private snackBar:MatSnackBar) {}

  updateProfile() {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.companyDetail = JSON.parse(params["companyid"]);
    });
    if (this.companyDetail) {
      this.apiservice
        .getkycDetails({ companyId: this.companyDetail })
        .subscribe((res: any) => {
          if (res.code == 200) {
            this.data = res.message[0];
            this.panDetailsLink = res.message[0].panDetails.documentUrl[0];
            this.addressProofLink = res.message[0].AddressProof.documentUrl[0];
            this.businessProofLink =
              res.message[0].BusinessProof.documentUrl[0];
            this.ownershipProofLink =
              res.message[0].OwnershipProof.documentUrl[0];
            this.VintageProofLink = res.message[0].VintageProof.documentUrl[0];
            this.PartnershipLink =
              res.message[0].PartnershipDetails.documentUrl[0];
            this.BankStatementDetailsLink =
              res.message[0].BankStatementDetails.documentUrl[0];
            this.FinancialDetailsLink =
              res.message[0].FinancialDetails.documentUrl[0];
            this.GstDetailsLink = res.message[0].GstDetails.documentUrl[0];

            // =============================================================
            this.kycForm = this.fb.group({
              panDetails: this.fb.group({
                panNumber: this.data && this.data.panDetails && this.data.panDetails.panNo ? this.data.panDetails.panNo : '',
                // documentList: [""],
              }),          
              AddressProof: this.fb.group({
                addressDocType: this.data && this.data.AddressProof && this.data.AddressProof.documentType ? this.data.AddressProof.documentType : '',
                addressDocNumber: this.data && this.data.AddressProof && this.data.AddressProof.documentNumber ? this.data.AddressProof.documentNumber : '',
                // documentList: [""],
              }),
              businessProof: this.fb.group({
                businessDocType: this.data && this.data.BusinessProof && this.data.BusinessProof.documentType ? this.data.BusinessProof.documentType : '',
                businessDocNumber: this.data && this.data.BusinessProof && this.data.BusinessProof.documentNumber ? this.data.BusinessProof.documentNumber : '',
                // documentList: [""],
              }),
              ownershipProof: this.fb.group({
                ownershipDocType: this.data && this.data.OwnershipProof && this.data.OwnershipProof.documentType ? this.data.OwnershipProof.documentType : '',
                ownershipDocNumber: this.data && this.data.OwnershipProof && this.data.OwnershipProof.documentNumber ? this.data.OwnershipProof.documentNumber : '',
                // documentList: [""],
              }),
              bankingDetails: this.fb.group({
                documentList: [""],
              }),
              vintageProof: this.fb.group({
                businessvintageProof: "",
                documentList: [""],
              }),
              partnershipDetails: this.fb.group({
                documentList: [""],
              }),
              financialDetails: this.fb.group({
                financial_doc_1: "",
                doc_file_1: [""],
                financial_doc_2: "",
                doc_file_2: [""],
                financial_doc_3: "",
                doc_file_3: [""],
                gstDocList: [""],
              }),
            });
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
        });
    }
  }

  onClickBack() {
    this.router.navigate([`admin/companies`]);
  }

  detectFiles(event:any) {
    this.urls = [];
    let files = event.target.files;
    
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }

  // ======================
  async onSubmit() {
    var userid = "";
    const detailsStr = sessionStorage.getItem("authDetails");
    if (detailsStr) {
      const details = JSON.parse(detailsStr);
      const userDetails = details.user;
      userid = userDetails._id;
    }

    if(this.kycForm.valid && this.urls.length >= 3){
      var form = new FormData();
      form.append("panNo", this.kycForm.value.panDetails.panNumber);
      form.append(
        "addressDocType",
        this.kycForm.value.AddressProof.addressDocType
      ),
        form.append(
          "addressDocNumber",
          this.kycForm.value.AddressProof.addressDocNumber
        ),
        form.append(
          "ownershipDocType",
          this.kycForm.value.ownershipProof.ownershipDocType
        ),
        form.append(
          "ownershipDocNumber",
          this.kycForm.value.ownershipProof.ownershipDocNumber
        ),
        form.append(
          "businessDocType",
          this.kycForm.value.businessProof.businessDocType
        ),
        form.append(
          "businessDocNumber",
          this.kycForm.value.businessProof.businessDocNumber
        ),
        form.append(
          "vintageProof",
          this.kycForm.value.vintageProof.businessvintageProof
        ),
        this.panUrl.forEach((element : any) => {
          form.append("panCard", element, element.name);
        });
      this.addressUrl.forEach((element: any) => {
        form.append("addressFile", element, element.name);
      });
      this.businessUrl.forEach((element: any) => {
        form.append("BusinessProof", element, element.name);
      });
      this.gstUrl.forEach((element :any) => {
        form.append("GstDetails", element, element.name);
      });

      this.ownershipUrl.forEach((element: any) => {
        form.append("propertyOwnership", element, element.name);
      });
      this.vintageUrl.forEach((element: any) => {
        form.append("VintageProof", element, element.name);
      });
      this.bankingUrl.forEach((element :any) => {
        form.append("BankStatementDetails", element, element.name);
      });
      this.partnershipUrl.forEach((element: any) => {
        form.append("PartnershipDetails", element, element.name);
      });
      this.financialUrl.forEach((element: any) => {
        form.append("FinancialDetails", element, element.name);
      });
      this.urls.forEach((element: any) => { //Send shop photo
        form.append("shop_photo", element);
      });
      form.append("userID", userid);
      form.append("companyId", this.companyDetail);
      this.apiservice.kycRequest(form).subscribe((res: any) => {
        if (res && res.status == true) {
          this.kycForm.reset();
          this.snackBar.open(
            "KYC details saved successfully.",
            "Close",
            {
              duration: 5 * 3000,
              panelClass: ["error-dialog"],
            }
          );
        } else {
          this.snackBar.open(res.message, "Close", {
            duration: 5 * 3000,
            panelClass: ["error-dialog"],
          });
        }
      });
    } else{
      this.snackBar.open("Please fill all the fields", "Close", {
        duration: 5 * 3000,
        panelClass: ["error-dialog"],
      });
    }
  }

  changeEvent(event: any) {
    switch (event.target.id) {
      case "panInput":
        let temp = "";
        this.panUrl = [];
        for (var i = 0; i < event.target.files.length; i++) {
          this.panUrl.push(event.target.files[i]);
        }

        break;
      case "address":
        this.addressUrl = [];
        for (var i = 0; i < event.target.files.length; i++) {
          this.addressUrl.push(event.target.files[i]);
        }
        break;
      case "business":
        this.businessUrl = [];
        for (var i = 0; i < event.target.files.length; i++) {
          this.businessUrl.push(event.target.files[i]);
        }
        break;
      case "ownership":
        this.ownershipUrl = [];
        for (var i = 0; i < event.target.files.length; i++) {
          this.ownershipUrl.push(event.target.files[i]);
        }
        break;
      case "vintage":
        this.vintageUrl = [];
        for (var i = 0; i < event.target.files.length; i++) {
          this.vintageUrl.push(event.target.files[i]);
        }
        break;
      case "partner":
        this.partnershipUrl = [];
        for (var i = 0; i < event.target.files.length; i++) {
          this.partnershipUrl.push(event.target.files[i]);
        }
        break;
      case "banking":
        this.bankingUrl = [];
        for (var i = 0; i < event.target.files.length; i++) {
          this.bankingUrl.push(event.target.files[i]);
        }
        break;
      case "finance_doc_1":
        this.doc1 = [];
        for (var i = 0; i < event.target.files.length; i++) {
          this.financialUrl.push(event.target.files[i]);
          this.doc1.push(event.target.files[i]);
        }
        break;
      case "finance_doc_2":
        this.doc2 = [];
        for (var i = 0; i < event.target.files.length; i++) {
          this.financialUrl.push(event.target.files[i]);
          this.doc2.push(event.target.files[i]);
        }
        break;
      case "finance_doc_3":
        this.doc3 = [];
        for (var i = 0; i < event.target.files.length; i++) {
          this.financialUrl.push(event.target.files[i]);
          this.doc3.push(event.target.files[i]);
        }
        break;
      case "gst_file":
        this.gstUrl = [];
        for (var i = 0; i < event.target.files.length; i++) {
          this.gstUrl.push(event.target.files[i]);
        }
        break;
      default:
        break;
    }
  }
}
