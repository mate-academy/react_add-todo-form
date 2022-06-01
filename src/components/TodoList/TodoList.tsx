import React from 'react';
import users from '../../api/users';
import { Todos } from '../../types/Todos';
import Todo from '../Todo/Todo';
import './TodoList.css';

type Props = {
  todos: Todos[];
};

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="list">
      {todos.map(todo => (
        <li className="item" key={todo.id}>
          <Todo
            todo={todo}
            user={users.find(user => user.id === todo.userId) || null}
          />
        </li>
      ))}
    </ul>
  );
};

export default React.memo(TodoList);
