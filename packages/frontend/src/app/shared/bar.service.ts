import {Injectable} from '@angular/core';
import {HttpClient, HttpResponseBase} from "@angular/common/http";
import {Beer, ManufacturerWithBeers} from "../administration/administration.service";

export enum SortByType {
  BEST = 'BEST',
  NEWEST = 'NEWEST',
  LONGEST_ON_MARKET = 'LONGEST_ON_MARKET'
}

export interface BarMenu {
  _id: string;
  manufacturer: Pick<ManufacturerWithBeers, 'name' | '_id'>
  beers: { beer: Beer, price: number }[]
}

export interface Bar {
  _id: string
  ownedBy: string;
  name: string;
  location: string;
  phoneNumber: string;
  thumbsUp: number;
  thumbsDown: number;
  coverPhoto: string;
  operatingSinceDate: Date;
  isAcceptedByAdmin: boolean;
  menu: BarMenu[]
}

interface CreateBarDto {
  name: string;
  location: string;
  operatingSinceDate: Date;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class BarService {

  constructor(private http: HttpClient) {
  }

  getBars({sortBy}) {
    return this.http.get<Bar[]>('bars', {params: {sortBy}});
  }

  getBar(barId: string) {
    return this.http.get<Bar>(`bars/${barId}`);
  }

  addBarMenu(barId: string, menuDataToSend: any) {
    return this.http.post<HttpResponseBase>(`bars/${barId}/menu`, menuDataToSend);
  }

  deleteBarMenu(barId: string, barMenuId: string) {
    return this.http.delete<HttpResponseBase>(`bars/${barId}/menu/${barMenuId}`);
  }

  updateBarMenu(barId: string, barMenu: BarMenu) {
    return this.http.put<HttpResponseBase>(`bars/${barId}/menu/${barMenu._id}`, barMenu);
  }

  createBar(createBarDto: CreateBarDto) {
    return this.http.post<Bar>('bars', createBarDto);
  }
}
