import { ResponseMeta } from 'src/app/ResponseMeta';

export interface TaskDto {
    id: number;
    name: string;
    checked: boolean;
    _links: ResponseMeta;
}
