import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpResponseBase} from "@angular/common/http";
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

  public createExampleProducer() {
    return this.http.post('manufacturers/createExample', {}) as Observable<ManufacturerWithBeers>;
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

  public deleteManufacturer(manufacturer: ManufacturerWithBeers) {
    return this.http.delete<HttpResponseBase>(`manufacturers/${manufacturer._id}`);
  }

  public addBeer(beer: Pick<Beer, '_manufacturerId' | 'name' | 'alcoholContent'>) {
    return this.http.post<Beer>(`manufacturers/${beer._manufacturerId}/beers`, { name: beer.name, alcoholContent: beer.alcoholContent });
  }

  public deleteBeer(manufacturerId: string, beerId: string) {
    return this.http.delete<HttpResponseBase>(`manufacturers/${manufacturerId}/beers/${beerId}`);
  }
}
