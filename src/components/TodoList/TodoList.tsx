import React from 'react';
import users from '../../api/users';
import { Todo } from '../../types/Todo';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

type Props = {
  todos: Todo[];
};

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="list">
      {todos.map(todo => (
        <li className="item" key={todo.id}>
          <TodoItem
            todo={todo}
            user={users.find(user => user.id === todo.userId) || null}
          />
        </li>
      ))}
    </ul>
  );
};

export default React.memo(TodoList);
