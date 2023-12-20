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
      console.log(childRoute);
      console.log(state)

      if(state.url.includes('edit')) {
        alert("Usuário sem acesso")
        return false
      }

      return true;
  }

}