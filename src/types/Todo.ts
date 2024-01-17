export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export function getLatestTodoId(arr: Todo[]): number {
  const ids: number[] = arr.map(todo => todo.id);

  return Math.max(...ids);
}
