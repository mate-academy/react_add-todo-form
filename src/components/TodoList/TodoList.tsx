import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../Type/Todo';

type Props = {
  todos: Todo[];
  userId: number;
};

export const TodoList: React.FC<Props> = ({ todos, userId }) => {
  const vsbTodos = todos
    .filter(todo => todo.userId === userId);

  return (
    <>
      <h2>{vsbTodos.length ? 'Todos' : 'Todos none'}</h2>
      <ul className="TodoList">
        {
          vsbTodos.map(todo => (
            <li
              key={todo.id}
              className={todo.completed ? 'li completed' : ''}
            >
              <TodoInfo
                title={todo.title}
              />
            </li>
          ))
        }
      </ul>
    </>
  );
};
