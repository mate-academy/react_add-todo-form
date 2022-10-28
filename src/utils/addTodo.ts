import { TodoFromServer } from '../types/TodoFromServer';

export function addTodo(
  userId: number,
  todoId: number,
  titleTodo: string,
  todos: TodoFromServer[],
) {
  const todo = {
    id: todoId,
    title: titleTodo,
    completed: false,
    userId,
  };

  return [...todos, todo] as TodoFromServer[];
}
