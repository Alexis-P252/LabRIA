import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UnidadCurricular } from '../interfaces';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnidaesCurricularesService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    //'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  constructor(private http:HttpClient) { }

  getUnidadesCurriculares(){
    return this.http.get(environment.api_url + "UnidadesCurriculares/");
  }

  newUnidadCurricular(unidadCurricular: UnidadCurricular){
    return this.http.post(environment.api_url + "UnidadesCurriculares/",
    {
      id: unidadCurricular.id,
      nombre: unidadCurricular.nombre,
      descripcion: unidadCurricular.descripcion,
      creditos: unidadCurricular.creditos,
      documento: unidadCurricular.documento,
      semestre: unidadCurricular.semestre,
      materia: unidadCurricular.materia,
      previas: unidadCurricular.previas
    },
    {
      headers: this.headers
    });
  }

  updateUnidadCurricular(unidadCurricular: UnidadCurricular){
    const url = environment.api_url + "UnidadesCurriculares/" + unidadCurricular.id;
    return this.http.put(url,{
      id: unidadCurricular.id,
      nombre: unidadCurricular.nombre,
      descripcion: unidadCurricular.descripcion,
      creditos: unidadCurricular.creditos,
      documento: unidadCurricular.documento,
      semestre: unidadCurricular.semestre,
      materia: unidadCurricular.materia,
      previas: unidadCurricular.previas
    },
    {headers: this.headers}
    );
  }

  deleteUnidadCurricular(id: number){
    const url = environment.api_url + "UnidadesCurriculares/" + id;
    return this.http.delete(url,
    {headers: this.headers}
    );
  }



}
