import todos from '../api/todos';
import { Todo } from '../types/Todo';

export default function getTodos(): Todo[] {
  return [...todos];
}
