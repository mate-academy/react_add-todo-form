import { TodoInfo } from '../TodoInfo';

type ToDo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type ListOfTodos = {
  todos: ToDo[];
};

export const TodoList: React.FC<ListOfTodos> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
