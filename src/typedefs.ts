export type User = {
  id: number,
  name: string,
};

export type Todo = {
  userId: number | undefined,
  id: number,
  title: string,
  completed: boolean,
};

export type State = {
  users: User[],
  todos: Todo[],
  newTitle: string,
  user: number,
  inputError: boolean,
  selectError: boolean,
};
