import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const styleTextDecotationNone = {
    listStyleType: 'none',
    padding: 0,
  };

  return (
    <section className="TodoList">
      <ul style={styleTextDecotationNone}>
        {todos.map(todo => (
          <li key={todo.id}>
            <TodoInfo todo={todo} />
          </li>
        ))}
      </ul>
    </section>
  );
};
