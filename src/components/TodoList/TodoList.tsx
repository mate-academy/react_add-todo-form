import { CompletedTodo } from '../../type';
import { TodoInfo } from '../TodoInfo';

type Prop = {
  todos: CompletedTodo[]
};

export const TodoList: React.FC<Prop> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((completedTodo: CompletedTodo) => {
        const { todo } = completedTodo;

        return (
          <TodoInfo
            key={todo.id}
            completedTodo={completedTodo}
          />
        );
      })}
    </section>
  );
};
