import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Previa } from '../interfaces';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PreviasService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    //'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  constructor(private http:HttpClient) { }

  newPrevia(previa: Previa){
    return this.http.post(environment.api_url + "Previas/",
    {
      unidadCurricular: previa.unidadCurricular,
      previa: previa.previa,
      tipo: previa.tipo
    },
    {
      headers: this.headers
    });
  }

  deletePrevia(id: number){
    const url = environment.api_url + "Previas/" + id;
    return this.http.delete(url,
    {headers: this.headers}
    );
  }
}
