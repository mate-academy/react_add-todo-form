/// <reference types="react-scripts" />
type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | undefined;
};

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
