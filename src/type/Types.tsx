interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string,
    },
  }
}

export interface NewTodo {
  userId: number,
  id: number,
  title:string,
  completed: boolean,
  user: User | null,
}

export type State = {
  todos: NewTodo[],
  newTodoName: string,
  newTodoPerformer: number,
  isTodoNameEmpty: boolean,
  isTodoPerformerEmpty: boolean,
};
