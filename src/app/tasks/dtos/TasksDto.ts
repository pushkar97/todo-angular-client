import { ResponseMeta } from 'src/app/ResponseMeta';
import { TaskDto } from './TaskDto';

export interface TasksDto {
    _embedded: {taskDtoList: TaskDto[]};
    _links: ResponseMeta;
}
