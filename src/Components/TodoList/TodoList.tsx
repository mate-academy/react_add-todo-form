import React from 'react';
import TodoInfo from '../TodoInfo/TodoInfo';
import { Todo } from '../../types';

import './TodoList.scss';

type Props = {
  todos: Todo[],
};

const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="app__todo-list todo-list">
    {todos.map((todo) => (
      <li className="todo-list__card info" key={todo.id}>
        <TodoInfo
          title={todo.title}
          completed={todo.completed}
          user={todo.user}
        />
      </li>
    ))}
  </ul>
);

export default TodoList;
