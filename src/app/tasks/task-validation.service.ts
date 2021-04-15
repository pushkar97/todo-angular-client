import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { TasksService } from './tasks.service';

@Injectable({
  providedIn: 'root'
})
export class TaskValidationService {

  constructor(private taskService: TasksService) { }

  isUnique(task: string): (taskForm: FormGroup) => void {

    return (taskForm: FormGroup) => {

      const taskControl = taskForm.controls[task];

      if (!taskControl) {return ; }
      if (taskControl.errors) { return ; }

      this.taskService.getTasks()
      .pipe(
        map((tasksDto) => tasksDto._embedded ? tasksDto._embedded.taskDtoList : []),
        map((tasks) => tasks.filter(t => t.name === taskControl.value)),
        map((tasks) => !tasks.length),
        map((unique) => unique ? taskControl.setErrors(null) : taskControl.setErrors({notUnique: true}))
      )
      .subscribe();
    };
  }
}
