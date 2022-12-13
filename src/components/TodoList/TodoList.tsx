import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos = [] }) => (
  <section className="TodoList">
    {todos.map(todo => (

      <article
        className={classNames('TodoInfo',
          { 'TodoInfo--completed': todo.completed })}
        key={todo.id}
      >
        <TodoInfo title={todo.title} id={todo.id} />

        { todo.user
        && <UserInfo name={todo.user.name} email={todo.user.email} />}

      </article>
    ))}
  </section>

);
