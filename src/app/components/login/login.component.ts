import { Component, OnInit } from '@angular/core';
import { UserWService } from "../../services/user-w.service";
import { DataApiService } from '../../services/data-api.service';
import { ScrollTopService }  from '../../services/scroll-top.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/user-interface'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   ngFormLogin: FormGroup;
  submitted = false;
  constructor(
      public scrollTopService:ScrollTopService,
      public _uw:UserWService,
      private formBuilder: FormBuilder, 
      private dataApi: DataApiService,
      private authService: AuthService, 
      public router: Router,
    ) { }
 message = "";  
  public user : UserInterface ={
    name:"",
    email:"",
    password:"",
    usertype:""
  };
  public isError = false;
  public isLogged =false;

 loadAPI = null;  

  url = "assets/assetsdental/js/jquery.min.js";
  url1 = "assets/assetsdental/js/popper.min.js";
  url2= "assets/assetsdental/js/slick.js";
  url3 = "assets/assetsdental/plugins/swiper/js/swiper.min.js";
  url4 = "assets/assetsdental/js/script.js";

 public loadScript() {
    let node = document.createElement("script");
    node.src = this.url;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  }

  public loadScript1() {
    let node = document.createElement("script");
    node.src = this.url1;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  }   
  public loadScript2() {
    let node = document.createElement("script");
    node.src = this.url2;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  } 
   public loadScript3() {
    let node = document.createElement("script");
    node.src = this.url3;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  } 
   public loadScript4() {
    let node = document.createElement("script");
    node.src = this.url4;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  }
    get fval() {
  return this.ngFormLogin.controls;
  }
    onIsError(): void {
       
    this.isError = true;
    setTimeout(() => {
    this.isError = true;
      //this.isError = false;
    }, 4000);
  }
     onCheckUser(): void {
    if (this.authService.getCurrentUser() === null) {
         this.isLogged = false;
      this._uw.isLogged=false;
    } else {
      this.isLogged = true;
      this._uw.isLogged = true;
      this.router.navigate(['']);
    }
  }
     onLogin(){
     this.submitted = true;
      if (this.ngFormLogin.invalid) {
      return;
        } 
//      alert('form fields are validated successfully!');
      return this.authService.loginUser(
        this.user.email, 
        this.user.password
        )
      .subscribe( 
        data => {
          //console.log(data);

              this.authService.setUser(data.user);
              const token = data.id;
              this.authService.setToken(token);
              this._uw.userd=data.id;
              this._uw.appointmentUsercard=data.user.id;
              this._uw.name=data.name;
              this._uw.usertype=data.user.usertype;
              this._uw.userW=data.user;
              this._uw.isLogged=true;
              this._uw.appointmentUsercard= "p"+this._uw.appointmentUsercard;
              this.router.navigate(['/dashboard']);
              this.isError = false;
           
        },
         error => {
                if(error.status==401){
                this.isError = true;
                this.message="Usuario o contraseña inválidos";
              }//
         this.onIsError();
         }

        ); 
  }   
  ngOnInit() {
     this.ngFormLogin = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]]
      });

         if (this._uw.loaded==true){
      this.loadAPI = new Promise(resolve => {
        this.loadScript();
        this.loadScript1();
        this.loadScript2();
        this.loadScript3();
        this.loadScript4();
        // this.loadScript3();
        });
      }
    this._uw.loaded=true;
  }

}
