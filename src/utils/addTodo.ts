import { TodoFromServer } from '../types/TodoFromServer';

type Todo = {
  selectedUserId: number,
  newTodoId: number,
  title: string,
  todos: TodoFromServer[],
};

export function addTodo({
  selectedUserId,
  newTodoId,
  title,
  todos,
}: Todo): TodoFromServer[] {
  const todo = {
    id: newTodoId,
    title,
    completed: false,
    userId: selectedUserId,
  };

  return [...todos, todo] as TodoFromServer[];
}
