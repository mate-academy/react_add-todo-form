import { Todo } from '../types/Todo';

export function addNewTodo(
  todos: Todo[],
  onTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  title: string,
  userId: number,
  completed = false,
) {
  const newTodo: Todo = {
    id: 1,
    title: title,
    completed: completed,
    userId: userId,
  };

  if (todos.length === 0) {
    onTodos([newTodo]);

    return;
  }

  const maxId = Math.max(...todos.map(item => item.id));

  newTodo.id += maxId;

  onTodos(current => [...current, newTodo]);
}
