import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { MyConfig } from "../my-config";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    user: any;
    public _isAdminIn$ = new BehaviorSubject<boolean>(false);
    isAdminIn$ = this._isAdminIn$.asObservable();
    public _isUserIn$ = new BehaviorSubject<boolean>(false);
    isUserIn$ = this._isUserIn$.asObservable();
    isLogged = false;
    constructor(private http: HttpClient, private router: Router) {
    }


    public Register(user: any) {
        return this.http.post(MyConfig.apiAdress + `/api/User/register`, user);
    }

    public Login(user: any) {
        return this.http.post(MyConfig.apiAdress + `/api/User/login`, user)
            .subscribe((userJwt: any) => {
                console.log(userJwt);
                localStorage.setItem("authToken", userJwt.jwt);
                if (userJwt.role == "User") {
                    this._isUserIn$.next(true);
                }
                else {
                    this._isAdminIn$.next(true);
                    this._isUserIn$.next(true);
                }
                this.user = userJwt;
                this.isLogged = true;
                this.router.navigateByUrl("/home");
            });
    }

}