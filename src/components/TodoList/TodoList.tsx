import { TodoInfo } from '../TodoInfo';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <>
      {todos.map((titleBlock) => (
        <TodoInfo todo={titleBlock} key={titleBlock.id} />
      ))}
    </>
  );
};
