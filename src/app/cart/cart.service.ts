import { HttpClient, HttpParams } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";
import { Subject } from "rxjs";
import { userGame } from "../models/userGameModel";
import { MyConfig } from "../my-config";

@Injectable({ providedIn: "root" })
export class cartService {
    @Output() buyCheck = new EventEmitter();
    @Output() changeQuantity = new EventEmitter();
    @Output() sendToOrder = new EventEmitter();
    public numberOfItems: Subject<number> = new Subject();
    public _deleteOperationSuccessfulEvent$: Subject<boolean> = new Subject();
    constructor(private http: HttpClient) { }

    getProductsById(userId: number) {
        return this.http.get(MyConfig.apiAdress + `/api/UserGame/${userId}`);
    }

    addToCart(item: userGame, headers: any) {
        return this.http.post(MyConfig.apiAdress + `/api/UserGame`, item);
    }

    delete(id: number, userId: number, headers: any) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('id', id);
        queryParams = queryParams.append('userId', userId);
        return this.http.delete(MyConfig.apiAdress + `/api/UserGame`, { params: queryParams });
    }

    deleteRange(userId: number) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append("userId", userId);
        return this.http.delete(MyConfig.apiAdress + `/api/UserGame/DeleteAllFromCart`, { params: queryParams });
    }

    updateCart(item: userGame, headers: any) {
        return this.http.put(MyConfig.apiAdress + `/api/UserGame`, item);
    }

    updateRange(item: userGame[], headers: any) {
        return this.http.put(MyConfig.apiAdress + `/api/UserGame/UpdateRange`, item);
    }

    getOrder(userId: number) {
        return this.http.get(MyConfig.apiAdress + `/api/UserGame/GetOrderById${userId}`);
    }

    getPurchaseHistory(userId: number, headers: any) {
        return this.http.get(MyConfig.apiAdress + `/api/UserGame/GetPurchaseHistory${userId}`, headers)
    }
}