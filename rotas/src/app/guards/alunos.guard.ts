import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn:"root"
})
export class AlunosGuard implements CanActivateChild {

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> {
      console.log("AlunosGuard: Guarda de rota filha");

      if(state.url.includes('edit')) {
        // alert("Usuário sem acesso")
        // return false
      }

      return true;
  }

}