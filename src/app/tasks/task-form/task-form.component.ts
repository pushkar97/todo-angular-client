import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Task } from '../Task';
import { TaskValidationService } from '../task-validation.service';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  @Output() created = new EventEmitter<Task>();

  taskForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]]
  }, {
    validator: this.validators.isUnique('name')
  });

  constructor(private formBuilder: FormBuilder,
              private taskService: TasksService,
              private validators: TaskValidationService) { }

  ngOnInit(): void {}

  submit(): void {
    if (this.taskForm.valid){
      this.taskService
        .addTask(this.taskForm.value)
        .subscribe(t => { this.created.emit(t); });
      this.taskForm.reset();
    }
  }

  debug(): void {
    console.log(this.taskForm);
  }
}
