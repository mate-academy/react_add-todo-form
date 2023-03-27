import React from 'react';
import { Todo } from '../../react-app-env';
import { TodoInfo } from '../TodoInfo';
import './TodoList.scss';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <div className="TodoInfo-container">
    <section className="TodoList section">

      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  </div>
);
