import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  getNoticiasActivas(){
    return this.http.get(environment.api_url + "Noticias/Activas");

  }

  getAllNoticias(limit: number, offset: number){
      
    return this.http.get(environment.api_url + "Noticias/Paged/" + offset + "/" + limit);
  }


}
