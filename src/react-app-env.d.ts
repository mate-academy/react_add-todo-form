interface Todo {
  userId: number | null;
  id: number;
  uuid: string,
  title: string;
  completed: boolean;
  user: User | null;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}
