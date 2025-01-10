type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export const getHigherId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};
