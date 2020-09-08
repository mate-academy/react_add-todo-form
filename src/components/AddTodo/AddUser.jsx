import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import './AddUser.scss';

export class AddUser extends React.Component {
  state = {
    userId: 0,
    title: '',
    titleError: false,
    userError: false,
  }

  sendNewTodo = () => {
    const { title, userId } = this.state;

    if (!title || !userId) {
      this.setState({
        titleError: !title,
        userError: !userId,
      });

      return;
    }

    this.props.addedUser(this.state);

    this.setState({
      userId: 0,
      title: '',
    });
  }

  render() {
    const { titleError, userError } = this.state;
    const { userData } = this.props;

    return (
      <>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            this.sendNewTodo();
          }}
          action=""
          className="addUser"
        >
          <div className="container">
            <select
              className={ClassNames(
                'addUser__input',
                { ' addUser__input-error': userError },
              )}
              value={this.state.userId}
              onChange={(event) => {
                this.setState({
                  userId: event.target.selectedIndex,
                  userError: false,
                });
              }}
              name=""
            >
              <option value="0">
                Choose a user!
              </option>
              {
                userData.map(user => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                ))
              }
            </select>
            {
              userError
                ? (
                  <span className="addUser__input-error__Message">
                    Select User!
                  </span>
                )
                : null
            }
          </div>
          <div className="container">
            <textarea
              className={ClassNames(
                'addUser__input',
                { ' addUser__input-error': titleError },
              )}
              placeholder="Enter todo title"
              value={this.state.title}
              onChange={(event) => {
                this.setState({
                  title: event.target.value,
                  titleError: false,
                });
              }}
            />
            {
              titleError
                ? (
                  <span className="addUser__input-error__Message">
                    Enter your todo!
                  </span>
                )
                : null
            }
          </div>
          <button
            className="addUser__button"
            type="submit"
          >
            Add
          </button>
        </form>
      </>
    );
  }
}

AddUser.propTypes = {
  userData: PropTypes.arrayOf(PropTypes.object).isRequired,
  addedUser: PropTypes.func.isRequired,
};
