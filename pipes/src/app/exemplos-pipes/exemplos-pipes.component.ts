import { Component } from '@angular/core';
import { Observable, interval, map } from 'rxjs';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.scss']
})
export class ExemplosPipesComponent {
  livro: any = {
    titulo: 'Estruturas de Dados e Algoritmos com JavaScript',
    rating: 4.95484,
    numeroPaginas: 408,
    preco: 93.6,
    dataLancamento: new Date(2019, 3, 11),
    url: 'https://a.co/d/cWrG9Eo'
  }

  livros: string[] = ['Angular2', 'Java'];

  filtro: string = ''

  addCurso(valor: string) {
    this.livros.push(valor);
  }

  obterCursos() {
    if(this.livros.length === 0 || this.filtro === undefined || this.filtro.trim() === '') {
      return this.livros;
    }

    return this.livros.filter((v) => {
      if(v.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0) {
        return true;
      }
      return false;
    });
  }

  valorAsync = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Valor assincrono'), 2000)
  });

  valorAsync2 = interval(2000)
  .pipe(
    map(valor => 'Valor assincrono 2')
  );

}
