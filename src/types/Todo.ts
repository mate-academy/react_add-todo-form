interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId : number
  user?: User;
}

interface TodoInfoProps {
  todo: Todo;
}
