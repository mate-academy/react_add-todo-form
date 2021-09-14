/// <reference types="react-scripts" />

type State = {
  taskId: number,
  tasks: Pick<Task>[];
};

interface Task {
  userId: number;
  id: number;
  title: string;
  user: User | null;
}

interface User {
  id: number;
  name: string;
}
