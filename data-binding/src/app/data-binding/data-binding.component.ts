import { Component } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent {

  url: string = 'http://loiane.com';
  cursoAngular: boolean = true;
  urlDaImagem: string = 'https://picsum.photos/seed/picsum/200/300';

  getValor() {
    return 1;
  }

  getCurtirCurso() {
    return true;
  }

  constructor() {
  }
}
