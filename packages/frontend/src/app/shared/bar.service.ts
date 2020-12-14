import { Injectable } from '@angular/core';
import {HttpClient, HttpResponseBase} from "@angular/common/http";
import {Observable} from "rxjs";
import {Beer, ManufacturerWithBeers} from "../administration/administration.service";

export enum SortByType {
  BEST= 'BEST',
  NEWEST = 'NEWEST',
  LONGEST_ON_MARKET = 'LONGEST_ON_MARKET'
}

export interface Bar {
  _id: string
  name: string;
  location: string;
  phoneNumber: string;
  thumbsUp: number;
  thumbsDown: number;
  coverPhoto: string;
  operatingSinceDate: Date;
  isAcceptedByAdmin: boolean;
  menu: {
    manufacturer: Pick<ManufacturerWithBeers, 'name'>
    beers: { beer: Beer, price: number }[]
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class BarService {

  constructor(private http: HttpClient) { }

  getBars({ sortBy }) {
    return this.http.get('bars', { params: { sortBy } }) as Observable<Bar[]>;
  }

  getBar(barId: string) {
    return this.http.get(`bars/${barId}`) as Observable<Bar>;
  }

  addNewMenu(barId: string, menuDataToSend: any) {
    return this.http.post(`bars/${barId}/menu`, menuDataToSend) as Observable<HttpResponseBase>
  }
}
