import { Component, OnInit } from '@angular/core';
import { UserWService } from "../../services/user-w.service";
import { DataApiService } from '../../services/data-api.service';
import { ScrollTopService }  from '../../services/scroll-top.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UseractiveInterface } from '../../models/useractive-interface'
import { isError } from "util";

@Component({
  selector: 'app-lateralmenu',
  templateUrl: './lateralmenu.component.html',
  styleUrls: ['./lateralmenu.component.css']
})
export class LateralmenuComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public scrollTopService:ScrollTopService,
    public _uw:UserWService,
    private dataApi: DataApiService,
    public router: Router,
    ) { }
  public isError = false;
  loadAPI = null;  
  public userActive : UseractiveInterface ={
  id:"",
  name:"",
  email:"",
  images:[],
  status:"",
  usertype:"",
  username:"",
  userd:""
  }
   onCheckUser(): void {
    if (this.authService.getCurrentUser() === null) {
      this._uw.isLogged=false;
    } else {
      this._uw.isLogged=true;
    }
  }

  onlogoutUser():void{
    this.authService.logoutUser();
    this._uw.isLogged=false;
    this.router.navigate(['/login']);
  }

  url = "assets/assetsdental/js/jquery.min.js";
  url1 = "assets/assetsdental/js/popper.min.js";
  url2= "assets/assetsdental/js/slick.js";
  url3 = "assets/assetsdental/plugins/swiper/js/swiper.min.js";
  url4 = "assets/assetsdental/plugins/theia-sticky-sidebar/theia-sticky-sidebar.js";
  url5 = "assets/assetsdental/js/script.js";


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
  public loadScript5() {
    let node = document.createElement("script");
    node.src = this.url5;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  }
  ngOnInit() {
       if(!this._uw.isLogged){
      this.router.navigate(['/login']);
    }

    
    if(this._uw.usertype=='developertest'){
        this.dataApi.getUsercardByUserd2(this._uw.userW.id).subscribe((res:any) => {    
        this.userActive=(res[0]);     
        this._uw.images=res[0].images;       
        });

    }
    setTimeout(() => {
      this.isError = false;
    // console.log("Usuario activo: " +this.userActive.name +" ; "+this.userActive.userd);
    this._uw.userActiveId=this.userActive.userd;

    }, 5000);

         if (this._uw.loaded==true){
      this.loadAPI = new Promise(resolve => {
        this.loadScript();
        this.loadScript1();
        this.loadScript2();
        this.loadScript3();
        this.loadScript4();
        this.loadScript5();
        });
      }
    this._uw.loaded=true;
  }
}
