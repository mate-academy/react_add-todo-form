import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import { TodoPrepared } from '../../types/TodoPrepared';

import './TodoInfo.scss';

type Props = {
  todoPrepared: TodoPrepared;
};

type State = {
  completed: boolean;
};

export class TodoInfo extends React.Component<Props, State> {
  state = {
    completed: false,
  };

  changeStatus = () => {
    this.setState((state) => ({
      completed: !state.completed,
    }));
  };

  render() {
    const { title, completed, user } = this.props.todoPrepared;

    return (
      <>
        <div className="todoList__info">
          <h2 className="todoList__title">
            {`Task: ${title}`}
          </h2>
          <div className={classNames('todoList__status',
            {
              todoList__status__completed: completed,
            })}
          >
            <span
              style={this.state.completed ? { color: 'green' } : { color: 'red' }}
            >
              Completed:
            </span>
            {' '}
            <input
              type="checkbox"
              onChange={this.changeStatus}
            />
          </div>
        </div>
        {user && (
          <div className="todoList__userInfo">
            <UserInfo {...user} />
          </div>
        )}
      </>
    );
  }
}
