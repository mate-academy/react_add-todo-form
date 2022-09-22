import { CompletedTodo } from '../../type';
import { TodoInfo } from '../TodoInfo';

type Prop = {
  todos: CompletedTodo[]
};

export const TodoList: React.FC<Prop> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((completedTodo: CompletedTodo) => {
        return (
          <>
            <TodoInfo
              key={completedTodo.todo.id}
              {...completedTodo}
            />
          </>
        );
      })}
    </section>
  );
};
