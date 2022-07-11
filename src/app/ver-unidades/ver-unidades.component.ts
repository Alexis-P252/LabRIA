import { Component, OnInit } from '@angular/core';
import {UnidaesCurricularesService} from '../services/unidades-curriculares.service';
import { UnidadCurricular } from '../interfaces';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-ver-unidades',
  templateUrl: './ver-unidades.component.html',
  styleUrls: ['./ver-unidades.component.css']
})
export class VerUnidadesComponent implements OnInit {

  isLoading: boolean = true;
  private routeSub: Subscription = new Subscription;
  id: number = 0;
  unidad: any;
  pdf: string = "";
  

  constructor(private unidadesServ: UnidaesCurricularesService, private route: ActivatedRoute, private modalService: NgbModal, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    // Obtengo la id de la URL
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.unidadesServ.getUnidadCurricular(this.id).subscribe(
      (data) => {
        this.unidad = data;
      },
      (error) => {
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  sanitizePDF(pdf: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdf);
  }

  openFullscreen(content, documentoPDF) {
    this.modalService.open(content, { fullscreen: true });
    this.pdf = documentoPDF;
  }

  

}
