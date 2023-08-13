import { Component } from '@angular/core';

@Component({
  selector: 'app-diretive-ngfor',
  templateUrl: './diretive-ngfor.component.html',
  styleUrls: ['./diretive-ngfor.component.scss']
})
export class DiretiveNgforComponent {
  cursos: string[] = ["Angular 2", "Java", "Phonegap"];
}
