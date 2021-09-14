import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames';

import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';

type State = {

};

type Props = {
  todoList: Todo[];
  usersList: User[];
  addTodo: (newTodo: Todo) => void;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {

  };

  render() {
    const { todoList } = this.props;

    return (
      <div>
        <h1>
          List of todos
        </h1>
        <ul className="list-group list-group-flush">
          {todoList.map(todo => (
            <li
              key={todo.id}
              className={classNames('list-group-item list-group-item-primary', { 'list-group-item-success': todo.completed })}
            >
              {todo.user && <UserInfo user={todo.user} />}
              {todo.user && <TodoInfo todo={todo} />}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
