import React from 'react';
import './SelectUser.scss';
import users from '../../api/users';

type Props = {
  users:Users[];
};

type State = {

};

export class SelectUser extends React.PureComponent<Props, State> {
  users = this.props.users;

  userSelect = '';

  pickUser = (userName:string) => {
    this.userSelect = userName;
  };

  render() {
    return (
      <div className="SelectUser">
        <div className="SelectUser__placeholder">
          {this.userSelect.length !== 0}
          ?
          {this.userSelect }
          : Chose a user for the task please
        </div>
        <ul className="SelectUser__option">
          {
            users.map(user => (
              <li
                key={user.id}
                onClick={
                  () => {
                    this.pickUser(user.name);
                  }
                }
              >
                {user.name}
              </li>
            ))
          }
        </ul>

      </div>
    );
  }
}
