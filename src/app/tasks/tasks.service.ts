import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './Task';
import { TasksDto } from './dtos/TasksDto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { TaskDto } from './dtos/TaskDto';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TasksService {

  host = environment.host;
  baseUrl = `${this.host}api/tasks/`;
  httpOptions?: { headers: HttpHeaders };

  constructor(private http: HttpClient) {

    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  getTasks(): Observable<TasksDto> {
    return this.http.get<TasksDto>(this.baseUrl, this.httpOptions).pipe(
      catchError(this.handleError<TasksDto>('getTasks')
      ));
  }

  getTaskByid(id: number): Observable<TaskDto> {
    return this.http.get<TaskDto>(`${this.baseUrl}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError<TaskDto>(`getTaskById id=${id}`)
      ));
  }

  addTask(task: Task): Observable<TaskDto> {
    return this.http.post<TaskDto>(this.baseUrl, task, this.httpOptions).pipe(
      catchError(this.handleError<TaskDto>('Add Task'))
    );
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.baseUrl, task, this.httpOptions).pipe(
      catchError(this.handleError<Task>('Update Task'))
    );
  }

  deleteTask(task: TaskDto): Observable<Task> {
    return this.http.delete<Task>(task._links.self.href, this.httpOptions).pipe(
      catchError(this.handleError<Task>(`Delete Task id:${task.id}`))
    );
  }

  toggleCheched(task: TaskDto): Observable<TaskDto> {
    return this.http.get<TaskDto>(task._links.toggleChecked.href, this.httpOptions).pipe(
      catchError(this.handleError<TaskDto>(`ToggleCheck task id:${task.id}`))
    );
  }
  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
