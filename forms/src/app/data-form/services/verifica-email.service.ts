import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificaEmailService {

  constructor(private http: HttpClient) { }
  DELAY_TWO_SECOUNDS: number = 2000;

  verificarEmail(email: string) {
    return this.http.get('assets/dados/verificarEmail.json')
      .pipe(
        delay(this.DELAY_TWO_SECOUNDS),
        map((dados: any) => dados.emails),
        // tap(console.log),
        map((dados: {email: string}[]) => dados.filter(v => v.email === email)),
        // tap(console.log),
        map((dados: any[]) => dados.length > 0),
        // tap(console.log),

        );
  }
}
