import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";


export interface Beer {
  _id: string;
  _manufacturerId: string
  name: string;
  alcoholContent: string;
}

export interface ManufacturerWithBeers {
  _id: string;
  name: string;
  beers: Beer[]
}

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private http: HttpClient) { }

  public createExampleProducer(): Observable<any> {
    return this.http.post('manufacturers/createExample', {});
  }

  public getManufacturersWithBeers() {
    return this.http.get('manufacturers') as Observable<ManufacturerWithBeers[]>;
  }

  public changeManufacturerName(newName: string, manufacturerId: string) {
    return this.http.put(`manufacturers/${manufacturerId}`, { name: newName }) as Observable<ManufacturerWithBeers>
  }

  public changeBeer(beer: Pick<Beer, '_id' | 'name' | 'alcoholContent'>) {
    return this.http.put(`manufacturers/beers/${beer._id}`, { ...beer }) as Observable<Beer>
  }

  public addBeer(beer: Pick<Beer, '_manufacturerId' | 'name' | 'alcoholContent'>) {
    return this.http.post(`manufacturers/${beer._manufacturerId}/beers`, { name: beer.name, alcoholContent: beer.alcoholContent }) as Observable<Beer>
  }
}
