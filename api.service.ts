import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {token,signuptoken,loggedin,signup} from 'Saved details';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token=token;
  loggedin=loggedin;
  Signup=signup;
  signuptoken=signuptoken
  apiurl= "https://appuat.assetmonk.io/api/mobile/auth/login";
  apiurl2="https://appuat.assetmonk.io/api/accounts"
  apiurl3="https://appuat.assetmonk.io/api/investor-profile/personaldetails"

 
  // apiurl3="http://jsonplaceholder.typicode.com/"
  constructor(
    private httpclient: HttpClient,
    private router:Router 
  ) { }
  login(postData : any): Observable<Object>{
    const url= this.apiurl 
    return this.httpclient.post(url,postData);
  }
  otp(postData : any): Observable<Object>{
    const url= "https://appuat.assetmonk.io/api/mobile/auth/otp" 
    return this.httpclient.post(url,postData);
  }
  mobile(postData : any): Observable<Object>{
    const url= "https://appuat.assetmonk.io/api/mobile/auth/subscribeauthenticator" 
    return this.httpclient.post(url,postData);
  }
  signup(postData: any): Observable<Object>{
    const url= "https://appuat.assetmonk.io/api/mobile/auth/signup"
    return this.httpclient.post(url,postData);
  }
  resetpass(postData: any): Observable<Object>{
    const url= "https://appuat.assetmonk.io/api/mobile/auth/resetpassword"
    return this.httpclient.post(url,postData);
  }
  getbank(): Observable<Object>{
    // if(this.loggedin[0]=="true"){
    //   var t =this.token[0]
    // }
    // if(this.Signup[0]=="true"){
    //   var t=this.signuptoken[0];
    // }
    var t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvbGUiOiJpbnZlc3RvciIsInByb2ZpbGVreWNzdGF0dXMiOmZhbHNlLCJmaW5hbmNpYWxreWNzdGF0dXMiOmZhbHNlLCJzdWJzY3JpYmUiOmZhbHNlLCJUZXJtc19BbmRfQ29uZGl0aW9ucyI6dHJ1ZSwiX2lkIjoiNWUxYzBmZGMxYzRmMmMyMTg4NmYyOTcwIiwibmFtZSI6IktyaXNobmEgQ2hhaXRhbnlhIFAiLCJlbWFpbCI6ImtyaXNobmFjaGFpdGFueWEzNjZAZ21haWwuY29tIiwidmVyaWZpZWQiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjAtMDEtMTNUMDY6MzY6MTIuMTE2WiIsInVwZGF0ZWRBdCI6IjIwMjAtMDEtMTNUMDY6MzY6MTIuMTE2WiIsIl9fdiI6MCwicHVibGlja2V5IjoiMHg2Mjk5YjdlNDJiMzgxRjM1MDkxODdGMkZmNDYyMzA0NzE4RDBiMzU1In0sImF1dGhpZCI6ImF1dGgwfDVkZjhiMTNmNmMzMTU2MGYzZjA3ZmFiMSIsImlhdCI6MTU5ODg1MTYyMCwiZXhwIjoxNTk4ODg3NjIwfQ.7rQUZFbhJdTA_QPdT0e50voV6DCAPmw2RG8Ojg_8bro"
    var headers_object = new HttpHeaders().set("authorization", "Bearer " + t);
  
        const httpOptions = {
          headers: headers_object
        };
    const url=this.apiurl2 
    return this.httpclient.get(url,httpOptions);
  }
  postbank(data:any): Observable<Object>{
    // if(this.loggedin[0]=="true"){
    //   var t =this.token[0]
    // }
    // if(this.Signup[0]=="true"){
    //   var t=this.signuptoken[0];
    // }
    var t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvbGUiOiJpbnZlc3RvciIsInByb2ZpbGVreWNzdGF0dXMiOmZhbHNlLCJmaW5hbmNpYWxreWNzdGF0dXMiOmZhbHNlLCJzdWJzY3JpYmUiOmZhbHNlLCJUZXJtc19BbmRfQ29uZGl0aW9ucyI6dHJ1ZSwiX2lkIjoiNWUxYzBmZGMxYzRmMmMyMTg4NmYyOTcwIiwibmFtZSI6IktyaXNobmEgQ2hhaXRhbnlhIFAiLCJlbWFpbCI6ImtyaXNobmFjaGFpdGFueWEzNjZAZ21haWwuY29tIiwidmVyaWZpZWQiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjAtMDEtMTNUMDY6MzY6MTIuMTE2WiIsInVwZGF0ZWRBdCI6IjIwMjAtMDEtMTNUMDY6MzY6MTIuMTE2WiIsIl9fdiI6MCwicHVibGlja2V5IjoiMHg2Mjk5YjdlNDJiMzgxRjM1MDkxODdGMkZmNDYyMzA0NzE4RDBiMzU1In0sImF1dGhpZCI6ImF1dGgwfDVkZjhiMTNmNmMzMTU2MGYzZjA3ZmFiMSIsImlhdCI6MTU5ODg1MTYyMCwiZXhwIjoxNTk4ODg3NjIwfQ.7rQUZFbhJdTA_QPdT0e50voV6DCAPmw2RG8Ojg_8bro"

    var headers_object = new HttpHeaders().set("authorization", "Bearer " + t);
  
        const httpOptions = {
          headers: headers_object
        };
    const url=this.apiurl2 
    return this.httpclient.post(url,data,httpOptions);
  }
  deletebank(url:any): Observable<Object>{
    // if(this.loggedin[0]=="true"){
    //   var t =this.token[0]
    // }
    // if(this.Signup[0]=="true"){
    //   var t=this.signuptoken[0];
    // }
    var t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvbGUiOiJpbnZlc3RvciIsInByb2ZpbGVreWNzdGF0dXMiOmZhbHNlLCJmaW5hbmNpYWxreWNzdGF0dXMiOmZhbHNlLCJzdWJzY3JpYmUiOmZhbHNlLCJUZXJtc19BbmRfQ29uZGl0aW9ucyI6dHJ1ZSwiX2lkIjoiNWUxYzBmZGMxYzRmMmMyMTg4NmYyOTcwIiwibmFtZSI6IktyaXNobmEgQ2hhaXRhbnlhIFAiLCJlbWFpbCI6ImtyaXNobmFjaGFpdGFueWEzNjZAZ21haWwuY29tIiwidmVyaWZpZWQiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjAtMDEtMTNUMDY6MzY6MTIuMTE2WiIsInVwZGF0ZWRBdCI6IjIwMjAtMDEtMTNUMDY6MzY6MTIuMTE2WiIsIl9fdiI6MCwicHVibGlja2V5IjoiMHg2Mjk5YjdlNDJiMzgxRjM1MDkxODdGMkZmNDYyMzA0NzE4RDBiMzU1In0sImF1dGhpZCI6ImF1dGgwfDVkZjhiMTNmNmMzMTU2MGYzZjA3ZmFiMSIsImlhdCI6MTU5ODg1MTYyMCwiZXhwIjoxNTk4ODg3NjIwfQ.7rQUZFbhJdTA_QPdT0e50voV6DCAPmw2RG8Ojg_8bro"

    var headers_object = new HttpHeaders().set("authorization", "Bearer " + t);
  
        const httpOptions = {
          headers: headers_object
        };
    // const url="https://appuat.assetmonk.io/api/accounts/:id"
    return this.httpclient.delete(url,httpOptions);
  }
  getearnings(): Observable<Object>{
    // if(this.loggedin[0]=="true"){
    //   var t =this.token[0]
    // }
    // if(this.Signup[0]=="true"){
    //   var t=this.signuptoken[0];
    // }
    var t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvbGUiOiJpbnZlc3RvciIsInByb2ZpbGVreWNzdGF0dXMiOmZhbHNlLCJmaW5hbmNpYWxreWNzdGF0dXMiOmZhbHNlLCJzdWJzY3JpYmUiOmZhbHNlLCJUZXJtc19BbmRfQ29uZGl0aW9ucyI6dHJ1ZSwiX2lkIjoiNWUxYzBmZGMxYzRmMmMyMTg4NmYyOTcwIiwibmFtZSI6IktyaXNobmEgQ2hhaXRhbnlhIFAiLCJlbWFpbCI6ImtyaXNobmFjaGFpdGFueWEzNjZAZ21haWwuY29tIiwidmVyaWZpZWQiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjAtMDEtMTNUMDY6MzY6MTIuMTE2WiIsInVwZGF0ZWRBdCI6IjIwMjAtMDEtMTNUMDY6MzY6MTIuMTE2WiIsIl9fdiI6MCwicHVibGlja2V5IjoiMHg2Mjk5YjdlNDJiMzgxRjM1MDkxODdGMkZmNDYyMzA0NzE4RDBiMzU1In0sImF1dGhpZCI6ImF1dGgwfDVkZjhiMTNmNmMzMTU2MGYzZjA3ZmFiMSIsImlhdCI6MTU5ODg1MTYyMCwiZXhwIjoxNTk4ODg3NjIwfQ.7rQUZFbhJdTA_QPdT0e50voV6DCAPmw2RG8Ojg_8bro"

    var headers_object = new HttpHeaders().set("authorization", "Bearer " + t);
  
        const httpOptions = {
          headers: headers_object
        };
    const url="https://appuat.assetmonk.io/api/earnings"
    return this.httpclient.get(url,httpOptions);
  }
  getnotifications(): Observable<Object>{
    // if(this.loggedin[0]=="true"){
    //   var t =this.token[0]
    // }
    // if(this.Signup[0]=="true"){
    //   var t=this.signuptoken[0];
    // }
    var t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvbGUiOiJpbnZlc3RvciIsInByb2ZpbGVreWNzdGF0dXMiOmZhbHNlLCJmaW5hbmNpYWxreWNzdGF0dXMiOmZhbHNlLCJzdWJzY3JpYmUiOmZhbHNlLCJUZXJtc19BbmRfQ29uZGl0aW9ucyI6dHJ1ZSwiX2lkIjoiNWUxYzBmZGMxYzRmMmMyMTg4NmYyOTcwIiwibmFtZSI6IktyaXNobmEgQ2hhaXRhbnlhIFAiLCJlbWFpbCI6ImtyaXNobmFjaGFpdGFueWEzNjZAZ21haWwuY29tIiwidmVyaWZpZWQiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjAtMDEtMTNUMDY6MzY6MTIuMTE2WiIsInVwZGF0ZWRBdCI6IjIwMjAtMDEtMTNUMDY6MzY6MTIuMTE2WiIsIl9fdiI6MCwicHVibGlja2V5IjoiMHg2Mjk5YjdlNDJiMzgxRjM1MDkxODdGMkZmNDYyMzA0NzE4RDBiMzU1In0sImF1dGhpZCI6ImF1dGgwfDVkZjhiMTNmNmMzMTU2MGYzZjA3ZmFiMSIsImlhdCI6MTU5ODg1MTYyMCwiZXhwIjoxNTk4ODg3NjIwfQ.7rQUZFbhJdTA_QPdT0e50voV6DCAPmw2RG8Ojg_8bro"

    var headers_object = new HttpHeaders().set("authorization", "Bearer " + t);
  
        const httpOptions = {
          headers: headers_object
        };
    const url="https://appuat.assetmonk.io/api/notifications"
    return this.httpclient.get(url,httpOptions);
  }
  
  posttodos(postData:any): Observable<Object>{
    const url= this.apiurl2+ 'todos' 
    return this.httpclient.post(url,postData);
  }
  updatetodos(postData:any): Observable<Object>{
    const url= this.apiurl2+ 'todos/1'
    
    return this.httpclient.put(url,postData);
  }
  getposts(): Observable<Object>{
    const url= this.apiurl2 + 'posts'
    return this.httpclient.get(url)
  }
  getcomments(): Observable<Object>{
    const url= this.apiurl2 + 'comments'
    return this.httpclient.get(url)
  }
  getalbums(): Observable<Object>{
    const url=this.apiurl2 + 'albums'
    return this.httpclient.get(url)
  }
  getphotos(): Observable<Object>{
    const url=this.apiurl2 + 'photos'
    return this.httpclient.get(url)
  }
  getthumbnail(url:any): Observable<Object>{
    return this.httpclient.get(url);
  }
  getdetails(): Observable<Object>{
    // var t=this.signuptoken[0];
    // if(this.loggedin[0]=="true"){
    //   var t =this.token[0]
    // }
    // if(this.Signup[0]=="true"){
    //   var t=this.signuptoken[0];
    // }
    var t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvbGUiOiJpbnZlc3RvciIsInByb2ZpbGVreWNzdGF0dXMiOmZhbHNlLCJmaW5hbmNpYWxreWNzdGF0dXMiOmZhbHNlLCJzdWJzY3JpYmUiOmZhbHNlLCJUZXJtc19BbmRfQ29uZGl0aW9ucyI6dHJ1ZSwiX2lkIjoiNWUxYzBmZGMxYzRmMmMyMTg4NmYyOTcwIiwibmFtZSI6IktyaXNobmEgQ2hhaXRhbnlhIFAiLCJlbWFpbCI6ImtyaXNobmFjaGFpdGFueWEzNjZAZ21haWwuY29tIiwidmVyaWZpZWQiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjAtMDEtMTNUMDY6MzY6MTIuMTE2WiIsInVwZGF0ZWRBdCI6IjIwMjAtMDEtMTNUMDY6MzY6MTIuMTE2WiIsIl9fdiI6MCwicHVibGlja2V5IjoiMHg2Mjk5YjdlNDJiMzgxRjM1MDkxODdGMkZmNDYyMzA0NzE4RDBiMzU1In0sImF1dGhpZCI6ImF1dGgwfDVkZjhiMTNmNmMzMTU2MGYzZjA3ZmFiMSIsImlhdCI6MTU5ODg1MTYyMCwiZXhwIjoxNTk4ODg3NjIwfQ.7rQUZFbhJdTA_QPdT0e50voV6DCAPmw2RG8Ojg_8bro"

    var headers_object = new HttpHeaders().set("authorization", "Bearer " + t);
  
        const httpOptions = {
          headers: headers_object
        };
    const url=this.apiurl3 
    return this.httpclient.get(url,httpOptions);
  }
  editdetails(data:any): Observable<Object>{
    // if(this.loggedin[0]=="true"){
    //   var t =this.token[0]
    // }
    // if(this.Signup[0]=="true"){
    //   var t=this.signuptoken[0];
    // }
    var t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvbGUiOiJpbnZlc3RvciIsInByb2ZpbGVreWNzdGF0dXMiOmZhbHNlLCJmaW5hbmNpYWxreWNzdGF0dXMiOmZhbHNlLCJzdWJzY3JpYmUiOmZhbHNlLCJUZXJtc19BbmRfQ29uZGl0aW9ucyI6dHJ1ZSwiX2lkIjoiNWUxYzBmZGMxYzRmMmMyMTg4NmYyOTcwIiwibmFtZSI6IktyaXNobmEgQ2hhaXRhbnlhIFAiLCJlbWFpbCI6ImtyaXNobmFjaGFpdGFueWEzNjZAZ21haWwuY29tIiwidmVyaWZpZWQiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjAtMDEtMTNUMDY6MzY6MTIuMTE2WiIsInVwZGF0ZWRBdCI6IjIwMjAtMDEtMTNUMDY6MzY6MTIuMTE2WiIsIl9fdiI6MCwicHVibGlja2V5IjoiMHg2Mjk5YjdlNDJiMzgxRjM1MDkxODdGMkZmNDYyMzA0NzE4RDBiMzU1In0sImF1dGhpZCI6ImF1dGgwfDVkZjhiMTNmNmMzMTU2MGYzZjA3ZmFiMSIsImlhdCI6MTU5ODg1MTYyMCwiZXhwIjoxNTk4ODg3NjIwfQ.7rQUZFbhJdTA_QPdT0e50voV6DCAPmw2RG8Ojg_8bro"  

    var headers_object = new HttpHeaders().set("authorization", "Bearer " + t);
  
        const httpOptions = {
          headers: headers_object
        };
    const url=this.apiurl3 
    return this.httpclient.put(url,data,httpOptions);
  }
  
  
}
