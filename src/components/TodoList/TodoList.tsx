import React from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { UserInfo } from '../UserList/UserInfo';
import { TodoInfo } from './TodoInfo';
import { PreparedTodos } from '../PreparedTodos';
import './TodoList.scss';

type Props = {
  todos: PreparedTodos[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todoList">
    <TransitionGroup>
      {todos.map(todo => (
        <CSSTransition
          key={todo.id}
          timeout={500}
          classNames="item"
        >
          <li className="todoList__items" key={todo.id}>
            <TodoInfo todo={todo} />
            { todo.user && <UserInfo user={todo.user} /> }
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  </ul>
);
