import { Component, OnInit, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Platform, MenuController, AlertController,IonRouterOutlet, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RouterEvent, Router, NavigationEnd } from '@angular/router';
import {StorageService} from './storage.service'
import { SocketService } from './socket.service';
import * as io from "socket.io-client";
import Web3 from 'web3';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {username} from 'Saved details';

const { App } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
  username=username;
  activePath=""
  pages = [
    {
      title: 'My Portfolio',
      url: '/home/Myportfolio'
    },
    {
      title: 'Opportunities',
      url: '/home/Opportunities'
    },
    {
      title: 'Earnings',
      url: '/home/Earnings'
    },
    {
      title:'Notifications',
      url:'/home/Notifications'
    },
    {
      title:'Blockchain',
      url:'/home/Blockchain'
    },
    {
      title:'Helpdesk',
      url:'/home/Helpdesk'
    },
    {
      title:'Website',
      url:'https://assetmonk.io'
    },
    {
      title:'Settings',
      url:'/home/Settings'
    },
  ];
  selectedTheme:String;
  dark = false;
  showComponent=true;
  
 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private router:Router,
    private themeSwitcher:StorageService,
    private socketservice:SocketService,
    public alertCtrl: AlertController,
    private nativeStorage: NativeStorage,
    private navCtrl: NavController,
    private matIconRegistry:MatIconRegistry,
    private domSanitizer:DomSanitizer
  
  ) {
    this.initializeApp();
    this.matIconRegistry.addSvgIcon(
      "sideportfolio",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icon/sideportfolio.svg"));
      this.matIconRegistry.addSvgIcon(
        "sideblockchain",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icon/sideblockchain.svg"));
      this.matIconRegistry.addSvgIcon(
        "sideearnings",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icon/sideearnings.svg"));
      this.matIconRegistry.addSvgIcon(
        "sidenotifications",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icon/sidenotifications.svg"));  
      this.matIconRegistry.addSvgIcon(
       "sidebulb",
       this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icon/sidebulb.svg"));
      this.matIconRegistry.addSvgIcon(
      "sidemessage",
     this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icon/sidemessage.svg"));
     this.matIconRegistry.addSvgIcon(
      "sidesettings",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icon/sidesettings.svg"));
      this.matIconRegistry.addSvgIcon(
        "sideglobe",
       this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icon/sideglobe.svg"));
    if (this.router.url === '/home/Settings/ManageNotifications') {
      this.showComponent = false
      }
      var web3 = new Web3(
        new Web3.providers.HttpProvider(
          "https://bcnode1.assetmonk.io"
        )
      );
      this.socketservice.socket = io("https://bridge.assetmonk.io");
      this.socketservice.socket.on("transaction", (tx) => {
        this.presentAlertConfirm(tx,web3)
        });
        
  }
  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
  
      this.activePath=event.url
    
      
  })

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
 
  async presentAlertConfirm(x:any,web3:any) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Transaction',
      message: 'Confirm Transaction' ,
      buttons: [
        {
          text: 'Reject',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          this.reject(x) 

          }
        }, {
          text: 'Accept',
          handler: () => {
            this.transaction(x,web3)
          }
        }
      ]
    });
    await alert.present();
  }
  
  updateDarkMode() {
    document.body.classList.toggle('dark', this.dark);
    console.log(this.dark)
  }

  async transaction(x:any,web3:any){
    var publickey;
    var privatekey;
    var id;
    publickey=await this.nativeStorage.getItem('publickey')
    privatekey= await this.nativeStorage.getItem('privatekey')
    id=x.id
    console.log(JSON.stringify(x));
    console.log(privatekey);
    console.log(privatekey.toString())
    const nonce = await web3.eth.getTransactionCount(publickey)
    var signedTx = await web3.eth.accounts.signTransaction(
      x.tx,
      privatekey
    );
    console.log(JSON.stringify(signedTx));
    const sentTx = web3.eth.sendSignedTransaction(
      signedTx.raw || signedTx.rawTransaction
    );
    sentTx.on("receipt", (receipt) => {
      console.log("receipt ", JSON.stringify(receipt));
    });
    var data={
      'id':id,
      'type':"voting",
      'status':"accepted"
    }
    this.socketservice.socket.emit("message", JSON.stringify(data));
  }
  reject(x:any){
     var data;
       data={
      'id':x.id,
      'type':"voting",
      'status':"rejected"
    }
    this.socketservice.socket.emit("message",JSON.stringify(data));
  }
  // ThemeSwitcher() {
  //   // 0 = day mode
  //   // 1 = night mode
  //   if (this.themeSwitcher.currentTheme === 0) {
  //     this.themeSwitcher.setTheme('night');
  //     this.themeSwitcher.currentTheme = 1;
  //   } else {
  //     this.themeSwitcher.setTheme('day');
  //     this.themeSwitcher.currentTheme = 0;
  //   }
  // }

  
  }

