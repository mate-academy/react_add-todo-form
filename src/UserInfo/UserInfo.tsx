import React from 'react';
import users from '../api/users';

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void,
  inputError: string,
  selectError: string,
  userName: string,
};

export class UserInfo extends React.PureComponent<Props, {}> {
  render() {
    const {
      handleChange,
      inputError,
      selectError,
      userName,
    } = this.props;

    return (
      <>
        <label htmlFor="user-name" className="Todo__user-name">
          Choose name
          {' '}
          <select
            name="userName"
            id="user-name"
            value={userName}
            placeholder="Add a business"
            className="form-select"
            aria-label="Default select example"
            required
            onChange={handleChange}
          >
            <option
              value="Choose a user"
              disabled
            >
              Choose a user
            </option>
            {users.map(user => {
              return (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              );
            })}
          </select>
          {' '}
          <span style={{ color: 'red' }}>
            {selectError}
          </span>
        </label>
        {' '}
        <label htmlFor="user-plan" className="Todo__user-business">
          Choose name
          {' '}
          <input
            type="text"
            name="newTodo"
            placeholder="Write something"
            id="user-plan"
            className="form-control"
            onChange={handleChange}
          />
          {' '}
          <span style={{ color: 'red' }}>
            {inputError}
          </span>
        </label>
      </>
    );
  }
}
