import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  url: string = 'https://loiane.training';
  urlImage: string = 'http://lorempixel.com/400/200/nature/';
  cursoAngular: boolean = true;
  valorSalvo: string = '';
  valorAtual: string = '';

  isMouseOver: boolean = false;

  getValor() {
    return 1;
  }

  botaoClicado(){
    alert("Botão clicado");
  }

  onKeyUp(evento: KeyboardEvent){
    this.valorAtual = (<HTMLInputElement>evento.target).value;
  }

  getCurtirCurso() {
    return true;
  }

  salvarValor(valor: string) {
    this.valorSalvo = valor;
  }

  onMouseOverOut() {
    this.isMouseOver = !this.isMouseOver;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
