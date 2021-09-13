/// <reference types="react-scripts" />

interface Todo  {
  userId: number;
  id: uuid | number;
  title: string;
  completed: boolean;
  user: User;
};

type User =  {
  id: number;
  name: string;
  username: string;
  email: string;
} | undefined
