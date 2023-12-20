import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AlunoFormComponent } from "./aluno-form/aluno-form.component";
import { Observable } from "rxjs";
import { IFormCanDeactivate } from "../guards/iform.candeactivate";

@Injectable({
  providedIn:"root"
})
export class AlunosDeactivateGuard implements CanDeactivate<IFormCanDeactivate> {

  canDeactivate(
    component: IFormCanDeactivate,
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot, 
  ): boolean | Observable<boolean> {
    console.log("Rota desativada")
    return component.podeDesativar();
  }
}