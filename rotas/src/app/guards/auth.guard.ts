import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private verificarAcesso(): boolean {
    if (this.authService.usuarioEstaAutenticado()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  canActivate(): boolean | Observable<boolean> {
      console.log("AuthGuard")
      return this.verificarAcesso();
  }
  
  canLoad(): boolean | Observable<boolean> {
    console.log("CanLoad: verificando se o usuário pode carregar o código do modulo")
    return this.verificarAcesso();
  }


}
