import { Component, OnInit,ViewChild } from '@angular/core';
import { UserWService } from "../../services/user-w.service";
import { DataApiService } from '../../services/data-api.service';
import { ScrollTopService }  from '../../services/scroll-top.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UsercardInterface } from '../../models/usercard-interface'
import { HttpClient } from  '@angular/common/http';
import { DemoFilePickerAdapter } from  '../../file-picker.adapter';
import { FilePickerComponent } from '../../../assets/file-picker/src/lib/file-picker.component';
import { FilePreviewModel } from '../../../assets/file-picker/src/lib/file-preview.model';
import { ValidationError } from '../../../assets/file-picker/src/lib/validation-error.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
  
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
   adapter = new DemoFilePickerAdapter(this.http,this._uw);
  @ViewChild('uploader', { static: true }) uploader: FilePickerComponent;
   myFiles: FilePreviewModel[] = [];
  constructor( 
      private  http: HttpClient,
      public scrollTopService:ScrollTopService,
      public _uw:UserWService,
      private dataApi: DataApiService,
      private formBuilder: FormBuilder,
      public router: Router,
    ) { }
  loadAPI = null;  
  loaded = false;


  submitted = false;
  uploading = false;
  buttonDisabled = false;
  usercardSubmitted = false;




  selectedItems = [];
  dropdownList = [];
  dropdownSettings = {};

  ngFormUpdateUsercardData: FormGroup;

  public images:any[]=[];


  public usercardSubmit : UsercardInterface ={
    name:"",
    username:"",
    address:"",
    city:"",
    country:"",
    bloodType:"",
    province:"",
    postalCode:"",
    images:[],
    surname:"",
    phone:""
  };
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
  



  



  public upload(){
    this.uploading=true;
    this._uw.buttonDisabled=true;
  }



  getUsercardByUserd(id: string){
    this.dataApi.getUsercardByUserd2(id).subscribe(usercardSubmit => (this.usercardSubmit = usercardSubmit));
  }
 
  get fval2() {
    return this.ngFormUpdateUsercardData.controls;
  }





  okUpdateUsercard(usercard){
    if (this.ngFormUpdateUsercardData.invalid) {
      this._uw.errorFormUpdateUsercard=true;
      return;
    } 
    this._uw.errorFormUpdateUsercard=false;
    this.usercardSubmit=usercard;
    this.usercardSubmit.images=this._uw.images;
    let id = usercard.id;
    this.dataApi.updateUsercard(this.usercardSubmit, id)
      .subscribe(
         usercard => this.router.navigate(['/dashboard'])
    );
  }

  reset():void{
  }
  onValidationError(e: ValidationError) {

  }
  onUploadSuccess(e: FilePreviewModel) {

  }
  onRemoveSuccess(e: FilePreviewModel) {  

  }
  onFileAdded(file: FilePreviewModel) {
     this.myFiles.push(file);
  }
  removeFile() {
    this.uploader.removeFileFromList(this.myFiles[0].fileName);
  }
  ngOnInit() {
    this._uw.images=[];
    this.dropdownList = []; 
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Seleccionar todas',
      unSelectAllText: 'Deseleccionar todas',
      itemsShowLimit: 7,
      allowSearchFilter: false
    };
 
    
    if(this._uw.usertype=='developertest'){
      this.dataApi.getUsercardByUserd2(this._uw.userW.id).subscribe((res:any) => {    
          this.usercardSubmit=(res[0]);        
        });
      this.ngFormUpdateUsercardData = this.formBuilder.group({
        username: ['', [Validators.required]] ,
        name: ['', [Validators.required]] ,
        address:['',[Validators.required]], 
        phone:['',[Validators.required]], 
        city:['',[Validators.required]], 
        province:['',[]], 
        country:['',[Validators.required]], 
        bloodType:['',[Validators.required]], 
        postalCode:['',[]], 
        surname:['',[Validators.required]]
        });
      } 
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

