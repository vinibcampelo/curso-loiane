import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EstadoBr } from '../models/estado-br.model';
import { CidadeBr } from '../models/cidade-br.model';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr(): Observable<any> {
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json');
  }

  getCidadesBr(idEstado: any): Observable<any> {
    console.log(idEstado);
    
    return this.http.get<CidadeBr[]>('assets/dados/cidadesbr.json').pipe(
      map((cidades: CidadeBr[]) => cidades.filter(c => c.estado == idEstado))
    );
  }

  getCargos() {
    return [
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
      {nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr'}
    ]
  }

  getTecnologias() {
    return [
      {nome: 'java', desc: 'Java'},
      {nome: 'javascript', desc: 'JavaScript'},
      {nome: 'php', desc: 'PHP'},
      {nome: 'ruby', desc: 'Ruby'},
    ]
  }

  getNewsLetter() {
    return [
      {valor:'s', desc: 'Sim'},
      {valor:'n', desc: 'Não'}
    ]
  }
}
