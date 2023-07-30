import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../Types/todo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const listStyles = {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  };

  return (
    <section className="TodoList">
      <ul style={listStyles}>
        {todos.map((todo) => (
          <li>
            <TodoInfo todo={todo} key={todo.id} />
          </li>
        ))}
      </ul>
    </section>
  );
};
