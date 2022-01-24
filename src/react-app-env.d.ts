/// <reference types="react-scripts" />

interface User {
  name: string;
  email: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface VisibleTodo extends Todo {
  user: User | null;
}
