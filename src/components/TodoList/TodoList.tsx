import React from 'react';
import cn from 'classnames';

import './TodoList.scss';

import { TodoInfo } from '../TodoInfo';
import { UserInfo } from '../UserInfo';
import { TodoListProps } from '../../types/todoList';

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return (
          <article
            key={todo.id}
            data-id={`${todo.id}`}
            className={
              cn('TodoInfo', { 'TodoInfo--completed': todo.completed })
            }
          >
            <TodoInfo title={todo.title} />

            {todo.user && (
              <UserInfo
                name={todo.user.name}
                email={todo.user.email}
              />
            )}
          </article>
        );
      })}
    </section>
  );
};
