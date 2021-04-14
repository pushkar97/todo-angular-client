import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Task } from './Task';
import { TasksDto} from './dtos/TasksDto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { UsersService } from '../account/users.service';
import { TaskDto } from './dtos/TaskDto';
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  // host = 'https://tasks-api-rest.herokuapp.com/';
  host = 'http://localhost:8080/';
  baseUrl = `${this.host}api/tasks/`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      .append('Authorization', this.userService.token ? this.userService.token : '')
  };

  constructor(private http: HttpClient,
              private userService: UsersService) { }

  getTasks(): Observable<TasksDto>{
    return this.http.get<TasksDto>(this.baseUrl, this.httpOptions).pipe(
      catchError(this.handleError<TasksDto>('getTasks')
    ));
  }

  getTaskByid(id: number): Observable<TaskDto> {
    return this.http.get<TaskDto>(`${this.baseUrl}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError<TaskDto>(`getTaskById id=${id}`)
    ));
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task, this.httpOptions).pipe(
      catchError(this.handleError<Task>('Add Task'))
    );
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.baseUrl, task, this.httpOptions).pipe(
      catchError(this.handleError<Task>('Update Task'))
    );
  }

  deleteTask(task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.id;
    return this.http.delete<Task>(`${this.baseUrl}${id}`, this.httpOptions).pipe(
      catchError(this.handleError<Task>('Delete Task'))
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
