import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { AuthService } from "../../../../core/services/auth/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ApiService } from "../../services/api/api.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  redirect!: string;

  form!: FormGroup;

  private token!: string;

  private email: string = "";

  private password: string = "";

  userData: any;

  loginEmailerror = false;

  loginPwderror = false;

  pwdVisible = false;

  durationInSeconds = 2;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams["redirect"]) {
        this.redirect = queryParams["redirect"];
      }
    });

    this.form = this.fb.group({
      email: ["", [Validators.pattern, Validators.required]],
      password: ["", [Validators.pattern, Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.apiService.Adminlogin(this.form.value).subscribe((res: any) => {
        if (res.status == true) {
          if (
            (res.user.user_role == "xuritiAdmin")
            || (res.user.user_role == "xuritiStaff")
            || (res.user.user_role == "xuritiCreditMgr")
            || (res.user.user_role == "xuritiCollectionMgr")
            || (res.user.user_role == "xuritiCollectionStaff")) {              
            sessionStorage.setItem("LoginId", res.user._id);
            sessionStorage.setItem("Role", res.user.user_role);
            this.authService.setAuthStatus(res);
            this.router.navigate(["admin/dashboard"]);
          }
          else {
            this.snackBar.open("You are not allowed to login in this panel", "Close", {
              duration: this.durationInSeconds * 3000,
              panelClass: ["error-dialog"],
            });
          }
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
