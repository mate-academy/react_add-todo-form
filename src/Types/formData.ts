import { Todo } from './todoInterface';

export type FormData = Omit<Todo, 'id' | 'completed'>;
