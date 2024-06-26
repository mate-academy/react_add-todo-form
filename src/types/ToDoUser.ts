export type ToDoUser = {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  } | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};
