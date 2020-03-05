import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { StateTable, Login } from '../TableEntity/TableEntityClass';
import { LoginResponse } from '../modal/loginresponse.model'
@Component({ templateUrl: 'Login.html', styleUrls:['./LoginComponent.css' ]})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    loading = false;
    dashboard = false;
    returnUrl: string;
  login: LoginResponse;
    state: StateTable[];
    show = true;
    constructor(
        private formBuilder: FormBuilder, private authenticationService: AuthenticationService,  private route: ActivatedRoute,
        private router: Router
       
    ) {

       
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        } }


    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    get f() { return this.loginForm.controls; }
    onSubmit() {
        this.submitted = true;
     
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value).subscribe(data => {


            this.login = data, console.log(this.login),
                this.loading = false; this.router.navigate([this.returnUrl]); this.dashboard = true;  
        },
            (error: Response) => {
               
                this.loading = false;
                alert("Invalid user");
                console.log(error);
            },
            //error => () => {
                
            //    this.loading = false;
            //},
            () => console.log());

    }
}
