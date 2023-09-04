export type Todos = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export type Users = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type TodoWithUser = Todos & { user?: Users };
