import React from 'react';
import { Todo } from '../../type/todos';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  preparedTodos: Todo[],
};

const TodoList:React.FC<Props> = ({ preparedTodos }) => {
  return (
    <div className="list">
      <ul className="list__item">
        {preparedTodos.map(todo => (
          <li className="list__item-li" key={todo.id}>
            <TodoInfo todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
