import { Component, OnInit } from '@angular/core';
import { UserWService } from "../../services/user-w.service";
import { DataApiService } from '../../services/data-api.service';
import { ScrollTopService }  from '../../services/scroll-top.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { isError } from "util";
import { UserInterface } from '../../models/user-interface'; 
import { UsercardInterface } from '../../models/usercard-interface'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

//import { ScrollTopService }  from '../../services/scroll-top.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public user : UserInterface ={
        name:"",
        email:"",
        usertype:"",
        password:"",
        status:"",
      };
       message = "";  
    ngFormSignup: FormGroup;
    submitted = false;
    politics = false;
    public isError = false;
    public waiting = false;
    public msgError = '';
  constructor(
 // public scrollTopService:ScrollTopService,
    private formBuilder: FormBuilder,
    public scrollTopService:ScrollTopService,
    public _uw:UserWService,
    public dataApi: DataApiService,
    public router: Router,
    private authService: AuthService,
    private location: Location
    ) { }
    public usercardSubmit : UsercardInterface ={
    name:"",
    username:"",
    address:"",
    surname:"",
    images:[],
    userd:"",
    phone:""
  }; 

  loadAPI = null;
  url = "assets/assetsdental/js/jquery.min.js";
  url1 = "assets/assetsdental/js/popper.min.js";
  url2= "assets/assetsdental/js/slick.js";
  url3 = "assets/assetsdental/plugins/swiper/js/swiper.min.js";
  url4 = "assets/assetsdental/js/script.js";
setPolitics(){
  if (this.politics==true){this.politics=false}else{this.politics=true}
}
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

onRegister(){
    if (this.ngFormSignup.valid){
      this.isError = false;
      this.waiting=true;
      this.user.usertype='developertest';
      this.user.status='new';
      this.usercardSubmit.name=this.user.name;
      this.usercardSubmit.username=this.user.email;
      this.usercardSubmit.images[0]="https://www.buckapiservices.com/developer.png";
      this.authService
        .registerUser(this.user.name, this.user.email, this.user.password, this.user.usertype, this.user.status)
        .subscribe(
          user => {    
            this._uw.usercard=user;
          this.authService.setUser(user);
          const token = user.id;
          this.usercardSubmit.userd='p'+token;
          this._uw.userd=this.usercardSubmit.userd;  
          this.authService.setToken(token);
          }, 
          error => {
                if(error.status==422){
                this.isError = true;
                this.message="La dirección de correo ya se encuentra registrada";
              }
          }
        );
      this.usercardSubmit.usertype='developertest';
      this.usercardSubmit.status='new';
      setTimeout(() => {
        if (this.isError==false){  
          console.log("dato" +this.isError);
          this.saveUsercard(this.usercardSubmit);
       //   this.isError = false;
          }
        else{
          this.waiting=false;
        } 
      }, 5000);

    } 
    else {
      this.onIsError();
    }
  }

  public saveUsercard(usercard){
    return this.dataApi.saveUsercard(this.usercardSubmit)
       .subscribe(
            usercardSubmit => this.router.navigate(['/successregister'])
       );
       this.waiting=false;
}


  ngOnInit() {
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
        this.ngFormSignup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    });
  }

  get fval() {
  return this.ngFormSignup.controls;
  }
   onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }
}
