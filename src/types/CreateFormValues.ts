import { Todo } from './Todo';

export type CreateFormValues = Pick<Todo, 'title' | 'userId'>;
