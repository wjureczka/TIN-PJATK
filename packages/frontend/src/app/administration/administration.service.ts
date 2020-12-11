import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";


interface Beer {
  name: string;
  alcoholContent: string;
}

interface ManufacturerWithBeers {
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

  public getProducersWithBeers() {
    return this.http.get('manufacturers') as Observable<ManufacturerWithBeers>;
  }
}
