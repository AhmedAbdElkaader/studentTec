import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramsComponent } from './pages/programs/programs.component';

const routes: Routes = [
  { path: "", component: ProgramsComponent },
  { path: "**", component: ProgramsComponent },
  { path: "Programs", component: ProgramsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
