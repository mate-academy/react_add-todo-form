import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
import '../../styles/components/TodoList.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="Todolist d-flex flex-column">
    {
      todos.map(todo => (
        <li className="Todolist__item" key={todo.todoId}>
          <TodoInfo {...todo} />
        </li>
      ))
    }
  </ul>
);
