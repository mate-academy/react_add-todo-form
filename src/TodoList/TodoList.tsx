import React from 'react';
import classNames from 'classnames';
import users from '../api/users';

type Props = {
  todosCLone: Todo[]
};

export class TodoList extends React.PureComponent<Props, {}> {
  render() {
    const { todosCLone } = this.props;

    return (
      <>
        { todosCLone.map(todoCLone => {
          const {
            completed, title, id, uuid,
          } = todoCLone;

          return (
            <ul
              key={todoCLone.uuid}
              className={classNames('Todo__list', {
                Todo__completed: completed === true,
                Todo__working: completed === false,
              })}
            >
              <li className="Todo__item">
                <span className="Todo__user-info">
                  Name:
                  {' '}
                </span>
                { users[todoCLone.userId].name}
              </li>
              <li className="Todo__item">
                <span className="Todo__user-info">
                  Email:
                  {' '}
                </span>
                {users[todoCLone.userId].email}
              </li>
              <li className="Todo__item">
                <span className="Todo__user-info">
                  Business:
                  {' '}
                </span>
                {title}
              </li>
              <li className="Todo__item">
                <span className="Todo__user-info">
                  Status:
                  {' '}
                </span>
                {completed ? 'Completed' : 'Working'}
              </li>
              <li className="Todo__item">
                {id}
              </li>
              <li className="Todo__item">
                {uuid}
              </li>
            </ul>
          );
        })}
      </>
    );
  }
}
