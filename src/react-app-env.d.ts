/// <reference types="react-scripts" />

interface Todos {
  userId: number | null;
  id: number;
  title: string;
  completed: boolean;
  user: Users | null;
};

interface Users {
  id: number;
  name: string;
};
