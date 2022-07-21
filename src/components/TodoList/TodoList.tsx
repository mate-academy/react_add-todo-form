import React from 'react';
import Todo from '../../types/Todo';
import TodoInfo from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[];
};

const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todo__ul">
    {todos.map(task => (
      <li
        key={task.id}
        className="todo__li"
      >
        <TodoInfo todo={task} />
      </li>
    ))}
  </ul>
);

export default TodoList;
