import { TodoInfo } from '../TodoInfo';
import { Todo } from '../types';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos = [] }) => {
  return (
    <section className="TodoList">
      {todos.map(item => {
        // const user = todos.user.find(el => el.id === item.userId);

        return <TodoInfo key={item.id} todo={item} />;
      })}
    </section>
  );
};
