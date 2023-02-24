import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";
import { Subject } from "rxjs";
import { cartItem } from "../models/cartItemModel";
import { gameFilterModel } from "../models/gameFilterModel";
import { MyConfig } from "../my-config";
@Injectable({ providedIn: "root" })
export class GameService {
    @Output() onCheckOut = new EventEmitter();
    public addEditEvent$: Subject<boolean> = new Subject();
    public paging$: Subject<boolean> = new Subject();

    constructor(private http: HttpClient) { }

    getGames(filter?: gameFilterModel) {
        let queryParams = new HttpParams();

        if (filter.name != undefined) {
            queryParams = queryParams.append('name', filter.name);
        }
        if (filter.categoryId != undefined) {
            queryParams = queryParams.append('categoryId', filter.categoryId);
        }
        if (filter.subCategoryId != undefined) {
            queryParams = queryParams.append('subCategoryId', filter.subCategoryId);
        }
        if (filter.platform != undefined) {
            queryParams = queryParams.append('platform', filter.platform);
        }
        if (filter.sort != undefined) {
            queryParams = queryParams.append('sort', filter.sort);
        }

        queryParams = queryParams.append('page', filter.page);
        queryParams = queryParams.append('pageSize', filter.pageSize);
        return this.http.get(MyConfig.apiAdress + `/api/Game`, { params: queryParams });
    }

    getGamesById(id: number) {
        return this.http.get(MyConfig.apiAdress + `/api/Game/${id}`);
    }

    getGamesByMultipleIds(id: number[]) {
        let query: String = '';
        for (let i = 0; i < id.length; i++) {
            query = query + `gamesId=${id[i]}&`;
        }
        return this.http.get(MyConfig.apiAdress + `/api/Game/GetGamesById?${query}`);
    }

    updateGameRange(items: any[]) {
        return this.http.put(MyConfig.apiAdress + `/api/Game/UpdateRangeOfGames`, items);
    }

    postGames(game: any, headers: any) {
        return this.http.post(MyConfig.apiAdress + `/api/Game`, game, { headers: headers });
    }

    deleteGames(id: number, headers: any) {
        return this.http.delete(MyConfig.apiAdress + `/api/Game/${id}`, { headers: headers });
    }

    putGames(game: any, headers: any) {
        return this.http.put(MyConfig.apiAdress + `/api/Game`, game, { headers: headers });

    }

    getCategories() {
        return this.http.get(MyConfig.apiAdress + `/api/Category`);
    }

    getSubCategories() {
        return this.http.get(MyConfig.apiAdress + `/api/SubCategory`);
    }

    addCart(cartItem: cartItem) {
        return this.http.post(MyConfig.apiAdress + `/api/CartItem`, cartItem);
    }
}