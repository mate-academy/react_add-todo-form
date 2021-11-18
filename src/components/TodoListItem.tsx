import React from 'react';
import { Todo } from '../types/todo';

type Props = {
  todo: Todo;
};
type State = {};

export class TodoListItem extends React.Component<Props, State> {
  state = {};

  render() {
    const { todo } = this.props;
    const { user } = todo;

    return (
      <li className="TodoList__Item">
        <div className="UserInfo">
          <div className="UserInfo__Row">
            Username:
            {' '}
            {user?.username}
          </div>
          <div className="UserInfo__Row">
            Name:
            {' '}
            {user?.name}
          </div>
          <div className="UserInfo__Row">
            Email:
            {' '}
            {user?.email}
          </div>
        </div>
        <div className="UserTodoTitle">
          {todo.title}
        </div>
        <div className="UserTodoStatus">
          {todo?.completed ? 'Done' : ''}
        </div>
      </li>
    );
  }
}
