import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotaDetail } from './pages/nota-detail/nota-detail';
import { Home } from './pages/home/home';

const routes: Routes = [
  { path: "nota/:id", component: NotaDetail },
  { path: "home", component: Home },
  { pathMatch: "full", path: "", redirectTo: "/home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
