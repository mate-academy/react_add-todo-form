/// <reference types="react-scripts" />

interface User {
  name: string,
  email: string,
}

interface Todo {
  userId: number | null,
  id: number,
  title: string,
  completed: boolean,
  user: User | null,
}

type Event = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
