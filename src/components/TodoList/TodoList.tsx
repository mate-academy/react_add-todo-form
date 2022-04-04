import { FC } from 'react';
import { FullTodo } from '../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Props {
  todos: FullTodo[];
}

export const TodoList: FC<Props> = ({ todos }) => (
  <div className="todo">
    <ul className="todo_list">
      {
        todos.map(todo => (
          <li className="todo_item" key={todo.id}>
            {todo.user && <TodoInfo todo={todo} />}
          </li>
        ))
      }
    </ul>
  </div>
);
