/// <reference types="react-scripts" />
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface PrepearedTodo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}
