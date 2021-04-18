import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../account/AuthGuard';

import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
