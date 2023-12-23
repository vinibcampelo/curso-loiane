import { Injectable } from "@angular/core";
import { UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CursosGuard {

  canActivateChild(): boolean | Observable<boolean>| Promise<boolean | UrlTree> {
      console.log("Guarda de rota filha")
      return true;
  }
  

}