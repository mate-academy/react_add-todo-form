/// <reference types="react-scripts" />

type State = {
  title: string;
  taskId: number,
  userId: number;
  tasks: Pick<Task>[];
  noTitleError: string | null;
  nonValidTitle: string | null;
  noUserError: string | null;
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
