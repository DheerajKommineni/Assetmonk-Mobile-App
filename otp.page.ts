import { Component, OnInit } from '@angular/core';
import {mfatoken,obbcode,token,savedemail,savedpassword,loggedin} from 'Saved details'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  loggedin=loggedin
  fir:any;
  sec:any
  thd:any
  for:any
  fiv:any
  six:any
  OTP: any =  {
    first: "",
    second: "",
    third: "",
    forth: "",
    fifth: "",
    sixth: ""
  };
  timeInSeconds:any;
  time:any;
  runTimer:any;
  hasStarted:any;
  hasFinished:any;
  remainingTime:any;
  displayTime:any;
  otpstr:string;
  mfatoken=mfatoken;
  obbcode=obbcode;
  token=token;
  savedemail=savedemail;
  savedpassword=savedpassword;
  postData={
    mfaToken:this.mfatoken[0],
    oobCode:this.obbcode[0],
    otp:""
  }
  resendData={
    email:this.savedemail[0],
    password:this.savedpassword[0]
  }
  group ={
    otp : new FormControl(''),
  
  }
  loginform =new FormGroup(this.group);
//   otp= new FormControl('', Validators.compose([
//     Validators.minLength(5),
//     Validators.required,
//     Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
//  ]))


  constructor(private apiservice:ApiService,private router:Router,private nativeStorage: NativeStorage,
    private toastController: ToastController) { }

  ngOnInit() {
    this.initTimer(); this. startTimer();
  }
  submit(){
    this.otpstr=this.OTP.first + this.OTP.second + this.OTP.third + this.OTP.forth +this.OTP.fifth + this.OTP.sixth
    this.postData={
      mfaToken:this.mfatoken[0],
      oobCode:this.obbcode[0],
      otp:this.otpstr
    }
    console.log(this.postData)
        if(this.authentication()){
      this.apiservice.otp(this.postData).subscribe((response: any)=>{
        console.log(response);
        if(response.Token){
          this.nativeStorage.setItem('authToken', response.Token)
          .then(
            (data) => console.log('Stored token',data),
            error => console.error('Error storing item', error)
          );
          this.token.push(response.Token)
          this.loggedin.push("true");
          this.router.navigate(['../home']);
        }
        else{
          console.log("something is wrong")
        }
      },
      (error)=>{
        if(error.error.message){
          this.presentToast(error.error.message)
        }
        if(error.error.error){
          this.presentToast(error.error.error)
        }
        this.router.navigate(['../login']);
        this.mfatoken.pop();
        this.obbcode.pop();
        this.savedemail.pop();
        this.savedpassword.pop();
      }
      )
    }
    else{
      console.log("please fill the details");
    }
  
  }
  async presentToast(x:any) {
    const toast = await this.toastController.create({
      message: x,
      color:"warning",
      duration: 2000
    });
    toast.present();
  }
  back(){
    this.router.navigate(['../login']);
    this.mfatoken.pop();
    this.obbcode.pop();
    this.savedemail.pop();
    this.savedpassword.pop();

  }
  resend(){
    this.otpstr=this.OTP.first + this.OTP.second + this.OTP.third + this.OTP.forth + this.OTP.fifth + this.OTP.sixth
    console.log(this.otpstr)
    this.mfatoken.pop();
    this.obbcode.pop();
    this.apiservice.login(this.resendData).subscribe(
      (response: any)=>{
      console.log(response);
      if(response.mfaToken && response.status==true && response.oobCode){
        this.mfatoken.push(response.mfaToken);
        this.obbcode.push(response.oobCode);
        this.initTimer(); this. startTimer();
        console.log(this.mfatoken)
        console.log(this.mfatoken[0])
      }
    },
    (error)=>{
      console.log(error)
      console.log(error.error.message)}
    )

  }
  otpController(event,next,prev, index){


    if(index == 6) {
      console.log("submit")
    }
    if(event.target.value.length < 1 && prev){
      prev.setFocus()
    }
    else if(next && event.target.value.length>0){
      next.setFocus();
    }
    else {
     return 0;
    } 
 }

  authentication(){
    // let otp= this.postData.otp.trim();
    // let mfatoken=this.postData.mfaToken.trim();
    // let oobcode=this.postData.oobCode.trim()
  
    return (
      this.postData.otp && this.postData.mfaToken && this.postData.oobCode 
    )
  }
  initTimer() {
    // Pomodoro is usually for 25 minutes
   if (!this.timeInSeconds) { 
     this.timeInSeconds = 180; 
   }
 
   this.time = this.timeInSeconds;
   this.runTimer = false;
   this.hasStarted = false;
   this.hasFinished = false;
   this.remainingTime = this.timeInSeconds;
   
   this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
 }
 
 startTimer() {
    this.runTimer = true;
   this.hasStarted = true;
   this.timerTick();
 }
 
 timerTick() {
   setTimeout(() => {
 
     if (!this.runTimer) { return; }
     this.remainingTime--;
     this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
     if (this.remainingTime > 0) {
       this.timerTick();
     }
     else {
       this.hasFinished = true;
     }
   }, 1000);
 }
 
 getSecondsAsDigitalClock(inputSeconds: number) {
   var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
   var hours = Math.floor(sec_num / 3600);
   var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
   var seconds = sec_num - (hours * 3600) - (minutes * 60);
   var hoursString = '';
   var minutesString = '';
   var secondsString = '';
   hoursString = (hours < 10) ? "0" + hours : hours.toString();
   minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
   secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
   return   minutesString + ':' + secondsString;
 }

}
