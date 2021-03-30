import React from 'react';
import PropTypes from 'prop-types';
import { UserNameList } from '../UserNameList';
import { Notification } from '../Notification';

export class Form extends React.Component {
  state = {
    title: '',
    userId: '0',
    hasNotifySelect: false,
    hasNotifyTitle: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.title.length === 0) {
      this.setState({
        hasNotifyTitle: true,
      });
    }

    if (this.state.userId === '0') {
      this.setState({
        hasNotifySelect: true,
      });
    }

    if (this.state.userId > 0 && this.state.title.length > 0) {
      this.props.addTodo({
        title: this.state.title,
        userId: +this.state.userId,
        completed: false,
        user: this.props.users.find(user => user.id === +this.state.userId),
      });
      this.setState({
        title: '',
        userId: '0',
        hasNotifySelect: false,
        hasNotifyTitle: false,
      });
    }
  };

  titleHandle = (event) => {
    this.setState({
      title: event.target.value,
    });

    if (this.state.title.length > 0) {
      this.setState({
        hasNotifyTitle: false,
      });
    }
  }

  handleSelection = (event) => {
    this.setState({
      userId: event.target.value,
    });

    if (event.target.value !== '0') {
      this.setState({
        hasNotifySelect: false,
      });
    }
  }

  render() {
    const {
      title,
      userId,
      hasNotifySelect,
      hasNotifyTitle,
    } = this.state;

    const { users } = this.props;

    return (
      <>
        <form
          className="form"
          onSubmit={this.handleSubmit}
        >
          <labe>
            <span className="form__description"> Title:</span>
            <input
              type="text"
              className="form__field"
              placeholder="Title"
              value={title}
              onChange={(event) => {
                this.titleHandle(event);
              }}
            />
          </labe>

          <label>
            <span className="form__description"> User:</span>
            <select
              className="form__field"
              type="text"
              placeholder="User"
              value={userId}
              onChange={(event) => {
                this.handleSelection(event);
              }}
            >
              <option value="0">
                Choose user
              </option>
              <UserNameList users={users} />
            </select>

          </label>

          <button
            className="form__submit"
            type="submit"
          >
            Submit
          </button>
        </form>

        { hasNotifySelect && (
          <Notification notifSelect="Please choose a user!" />
        )}
        {hasNotifyTitle && (
          <Notification notifSelect="Please enter the title!" />
        )}

      </>
    );
  }
}

Form.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
