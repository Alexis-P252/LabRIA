import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Documento } from '../interfaces';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  getDocumentos (offset: number, limit: number){
    return this.http.get(environment.api_url + "Documentos/Paged/" + offset + "/" + limit);
  }

  getDocumentosActivos(categoria: string){
    return this.http.get(environment.api_url + "Documentos/Activos/",
    {
      params: { tipo: categoria },
      headers: this.headers
    });
    
  }

  newDocumento(documento: Documento){
    return this.http.post(environment.api_url + "Documentos/",
    {
      id: documento.id,
      titulo: documento.titulo,
      tipo: documento.tipo,
      documentoPDF: documento.documentoPDF,
      activo: documento.activo,
    },
    {
      headers: this.headers
    });
  }

  updateDocumento(documento: Documento){
    const url = environment.api_url + "Documentos/" + documento.id;
    return this.http.put(url,{
      id: documento.id,
      titulo: documento.titulo,
      tipo: documento.tipo,
      documentoPDF: documento.documentoPDF,
      activo: documento.activo,
    },
    {headers: this.headers}
    );
  }

  





 
}
