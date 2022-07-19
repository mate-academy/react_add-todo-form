import React from 'react';
import './TodoList.scss';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <>
    <div className="user">
      {todos.map(todo => (
        <div className="user__wrapper" key={todo.id}>
          <TodoInfo todo={todo} />
        </div>
      ))}
    </div>
  </>
);
