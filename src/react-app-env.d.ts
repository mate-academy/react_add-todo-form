/// <reference types="react-scripts" />

interface User {
  name: string;
  id: number;
};

interface Todo {
  user: User | null;
  id: number;
  title: string;
  completed: boolean;
};
