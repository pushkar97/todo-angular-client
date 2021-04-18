import { Component, OnInit } from '@angular/core';
import { ResponseMeta } from 'src/app/ResponseMeta';
import { TaskDto } from '../dtos/TaskDto';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: TaskDto[] = [];
  meta?: ResponseMeta;
  completedTasks = 0;

  constructor(private taskService: TasksService) {
    console.log('TaskListComponent created');
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks._embedded ? tasks._embedded.taskDtoList : [];
        this.meta = tasks._links;
        this.getCompletedTaskCount();
      });
  }

  onNewTask($event: any): void {
    this.tasks.push($event);
  }

  delete(task: TaskDto): void{
    this.tasks = this.tasks?.filter(ta => ta.id !== task.id);
    this.taskService.deleteTask(task)
      .subscribe(t => {
        this.getCompletedTaskCount();
        this.tasks = this.tasks?.filter(ta => ta.id !== task.id);
      });
  }

  OnChange($event: any, task: TaskDto): void {
    task.checked = $event.checked;
    this.taskService.toggleCheched(task).subscribe();
    this.getCompletedTaskCount();
  }

  getCompletedTaskCount(): void {
    this.completedTasks = this.tasks.filter(t => t.checked).length;
  }
}
