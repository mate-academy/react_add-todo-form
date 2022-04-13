import React from 'react';
import { User } from '../types/User';
import { Todo } from '../types/Todo';

import './TodoList.scss';

type Props = {
  todos: Todo[];
};

const formatPhoneNumber = (user: User) => (
  user.phone.split('').filter(el => !Number.isNaN(+el)).slice(0, 11).join('')
);

const getVisibleNumber = (str: string) => (
  str.length > 10
    ? `+${str[0]} (${str.slice(1, 4)}) ${str.slice(4, 7)} ${str.slice(7)}`
    : `(${str.slice(0, 3)}) ${str.slice(3, 6)} ${str.slice(6)}`
);

export class TodoList extends React.PureComponent<Props> {
  render() {
    const { todos } = this.props;

    return (
      <div className="content__wrapper">
        <h2 className="title content__title">
          Todo list
        </h2>
        <ul className="todo-list content__todo-list">
          {todos.map(todo => (
            <li
              className="item todo-list__item"
              key={todo.id}
            >
              <div className="item__content">
                <div className="todo-info item__todo-info">
                  <span className="todo-info__title">
                    {todo.title}
                  </span>
                  <span
                    className="todo-info__progres"
                  >
                    {todo.completed ? 'completed' : 'in progress'}
                  </span>
                </div>
                <div className="user-info item__user-info">
                  {todo.user && (
                    <>
                      <span className="user-info__name">
                        {todo.user.name}
                      </span>
                      <a
                        className="user-info__email"
                        href={todo.user.email}
                      >
                        {todo.user.email}
                      </a>
                      <a
                        className="user-info__phone"
                        href={`callto:${formatPhoneNumber(todo.user)}`}
                      >
                        {getVisibleNumber(formatPhoneNumber(todo.user).trim())}
                      </a>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
