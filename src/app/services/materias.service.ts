import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Materia } from '../interfaces';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  getMaterias(){
    return this.http.get(environment.api_url + "Materias/");
  }

  newMateria(materia: Materia){
    return this.http.post(environment.api_url + "Materias/",
    {
      id: materia.id,
      nombre: materia.nombre,
      descripcion: materia.descripcion,
      creditosMinimos: materia.creditosMinimos
    },
    {
      headers: this.headers
    });
  }

  updateMateria(materia: Materia){
    const url = environment.api_url + "Materias/" + materia.id;
    return this.http.put(url,{
      id: materia.id,
      nombre: materia.nombre,
      descripcion: materia.descripcion,
      creditosMinimos: materia.creditosMinimos
    },
    {headers: this.headers}
    );
  }

  deleteMateria(id: number){
    const url = environment.api_url + "Materias/" + id;
    return this.http.delete(url,
    {headers: this.headers}
    );
  }



}
