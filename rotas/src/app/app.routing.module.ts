import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders, NgModule } from "@angular/core";

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./guards/auth.guard.service";
import { CursosGuard } from "./guards/cursos.guard";
import { AlunosGuard } from "./guards/alunos.guard";

const appRoutes: Routes = [
  { path: 'cursos', 
    loadChildren: () => import('./cursos/cursos.module').then(mod => mod.CursosModule),
    canActivate: [AuthGuard],
    canActivateChild: [CursosGuard]
  },
  { 
    path: 'alunos',
    loadChildren: () => import('./alunos/alunos.module').then(mod => mod.AlunosModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login', component: LoginComponent },
  {
    path: '', component: HomeComponent,
    canActivate: [AuthGuard]
  }
]

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}