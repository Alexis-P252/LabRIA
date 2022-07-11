import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Noticia, Noticia_cantidad } from '../interfaces';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    //'Authorization': 'Bearer ' + localStorage.getItem('token')
  });


  constructor(private http: HttpClient) { }

  getNoticiasActivas(){
    return this.http.get<Noticia[]>(environment.api_url + "Noticias/Activas");

  }

  getAllNoticias(limit: number, offset: number){
      
    return this.http.get<Noticia_cantidad>(environment.api_url + "Noticias/Paged/" + offset + "/" + limit);

  }

  getNoticia(id: number){
    return this.http.get(environment.api_url + "Noticias/" + id);
  }


  newNoticia(noticia: Noticia){
    return this.http.post(environment.api_url + "Noticias/",
    {
      id: noticia.id,
      titulo: noticia.titulo,
      descripcion: noticia.descripcion,
      imagen: noticia.imagen,
      fechaCaducidad: noticia.fechaCaducidad,

    },
    {
      headers: this.headers
    });
  }


  updateNoticia(noticia: Noticia){
    const url = environment.api_url + "Noticias/" + noticia.id;
    return this.http.put(url,{
      id: noticia.id,
      titulo: noticia.titulo,
      descripcion: noticia.descripcion,
      imagen: noticia.imagen,
      fechaCaducidad: noticia.fechaCaducidad,
    },
    {headers: this.headers}
    );
  }


  deleteNoticia(id: number){
    const url = environment.api_url + "Noticias/" + id;
    return this.http.delete(url, {headers: this.headers});
  }


  






}
