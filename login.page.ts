import { Component, OnInit,ViewChild,Renderer2, ElementRef, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import {savemail,mfatoken,obbcode,savedemail,savedpassword} from 'Saved details';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { ToastController } from '@ionic/angular';
// import {
//   trigger,
//   state,
//   style,
//   animate,
//   transition
// } from "@angular/animations";
// import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { AnimationController, Animation, MenuController, Platform, AlertController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  // animations: [
  //   trigger('elementState', [
  //     state('opaque', style({
  //       opacity: 1
  //     })),
  //     state('transparent', style({
  //       opacity: 0
  //     })),
  //     transition('opaque => transparent', animate('4000ms ease-in')),
  //     transition('transparent => opaque', animate('4000ms ease-out'))
  //   ])
  // ]
})
export class LoginPage implements OnInit{
// Implementing AfterViewInit for animation 
  public postData = {
    email:'',
    password:''
  }
  savemail=savemail;
  mfatoken=mfatoken;
  obbcode=obbcode;
  savedemail=savedemail;
  savedpassword=savedpassword
  static postData: any;
  state= "transparent";
  status:any=" ";
  // anim: Animation
  // anim2:Animation
  // @ViewChild('square',{static:false}) square: ElementRef;
  // @ViewChild('square1',{static:false}) square1:ElementRef
  isPlaying=false;
  group ={
    EmailId : new FormControl(''),
    Password: new FormControl(''),
  }
  profileform =new FormGroup(this.group);
  EmailId = new FormControl('', Validators.compose([
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  ]))
  Password= new FormControl('', Validators.compose([
    Validators.minLength(8),
    Validators.required,
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
 ]))
  constructor(private router: Router, private apiService : ApiService,
    public animationctrl:AnimationController,public toastController: ToastController,
     private ctrl: MenuController,  private matIconRegistry: MatIconRegistry,
     private domSanitizer: DomSanitizer,
     private platform: Platform,
     private alertCtrl: AlertController,
     )
   { 
    this.matIconRegistry.addSvgIcon(
      "head",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icon/head.svg"));
      this.matIconRegistry.addSvgIcon(
        "email",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icon/email.svg"));
        this.matIconRegistry.addSvgIcon(
          "lock",
          this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icon/lock.svg"));
        

   }
 
   getEmailErrorMessage(x:any) {
    return 'Not a valid email' 
  }
  getErrorMessage(x:any) {
    return x.hasError('required') ? 'You must enter a value' : 
          x.hasError('minlength') ? 'You must enter atleast 8 characters':
    '';}
  ionViewWillEnter() {
    this.ctrl.enable(false);
 }
 ionViewWillLeave() {
    this.ctrl.enable(true);
 } 
 async presentToast(x:any) {
  const toast = await this.toastController.create({
    message: x,
    color:"warning",
    duration: 2000
  });
  toast.present();
}

   
  // ngAfterViewInit() {


  //   this.anim=this.animationctrl.create('myanim')
  //   this.anim
  //   .addElement(this.square.nativeElement)
  //   .duration(200)
  //   .iterations(1)
  //   .fromTo('opacity',0.2,1)
  //   .fromTo('transform', 'scale(1)','scale(1.2)')

  //   this.anim2=this.animationctrl.create('myanim2')
  //   this.anim2
  //   .addElement(this.square1.nativeElement)
  //   .duration(200)
  //   .iterations(1)
  //   .fromTo('opacity',0.2,1)
  //   .fromTo('transform', 'scale(1)','scale(1.2)')
    
  // }

  ngOnInit() {
  
  }

  Signin(){
    if(this.profileform.invalid){
      alert('Please fill the form completely')
      this.loginalert();
      return
    }

    this.postData={
      email:this.profileform.value.EmailId,
      password: this.profileform.value.Password
    }
    console.log(this.profileform.value);
        if(this.authentication()){
          this.savedemail.push(this.profileform.value.EmailId)
          this.savedpassword.push(this.profileform.value.Password)
      this.apiService.login(this.postData).subscribe(
        (response: any)=>{
        console.log(response);
        if(response.mfaToken && response.status==true && response.oobCode){
          this.mfatoken.push(response.mfaToken);
          this.obbcode.push(response.oobCode);
          this.router.navigate(['../otp']);
        }
      },
      (error)=>{
        console.log(error)
        console.log(error.error.message)
        if(error.error.message){
          this.presentToast(error.error.message)
        }
        if(error.error.error){
          this.presentToast(error.error.error)
        }
        if(error.error.message=="please enroll with a authenticator"){
          this.mfatoken.push(error.error.mfaToken)
          this.router.navigate(['../mobilenumber'])
        }
      }
      )
    }
    else{
      console.log("please fill the details");
    }
    
  }
  async loginalert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please fill the form completely',
      buttons: ['OK']
    });

    await alert.present();
  }
  authentication(){
    let emailid= this.postData.email.trim();
    let loginpassword= this.postData.password.trim();
    return (
      this.postData.email && this.postData.password && emailid.length > 0 && loginpassword.length > 0
    )
  }
 






//   toggleAnimation(){
//     if(this.isPlaying){
//       this.anim.stop();
//     }
//     else{
//       this.anim.play();
//     }
//     this.isPlaying = !this.isPlaying;
//   }
//   toggleAnimation2(){
//     if(this.isPlaying){
//       this.anim2.stop();
//     }
//     else{
//       this.anim2.play();
//     }
//     this.isPlaying = !this.isPlaying;
//   }

}
