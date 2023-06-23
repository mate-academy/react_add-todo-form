interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

export const newTodoId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};
