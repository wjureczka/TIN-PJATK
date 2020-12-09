import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

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
}
