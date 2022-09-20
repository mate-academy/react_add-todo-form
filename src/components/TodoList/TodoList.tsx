import { ComplitlyTodo } from '../../type';
import { TodoInfo } from '../TodoInfo';

type Prop = {
  todos: ComplitlyTodo[]
};

export const TodoList: React.FC<Prop> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((complitlyTodo: ComplitlyTodo) => {
        return (
          <>
            <TodoInfo
              key={complitlyTodo.todo.id}
              {...complitlyTodo}
            />
          </>
        );
      })}
    </section>
  );
};
