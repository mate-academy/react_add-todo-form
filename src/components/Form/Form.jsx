import React from 'react';
import PropTypes from 'prop-types';
import { UserType } from '../Todo';

class Form extends React.Component {
  state = {
    title: '',
    userId: '',
    isTitleValid: true,
    isUserIdValid: true,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });

    switch (name) {
      case 'title':
        this.setState({
          isTitleValid: true,
        });
        break;
      case 'userId':
        this.setState({
          isUserIdValid: true,
        });
        break;
      default:
        break;
    }
  }

  checkTodo = (userId, title) => {
    this.setState({
      isTitleValid: /^\w+$/.test(title),
      isUserIdValid: userId,
    });

    if (title.length > 0 && userId && /^\w+$/.test(title)) {
      this.setState({
        title: '',
        userId: '',
      });
      this.props.addTodo(userId, title);
    }
  }

  render() {
    const { isTitleValid, isUserIdValid, userId, title } = this.state;
    const { users } = this.props;

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          this.checkTodo(userId, title);
        }}
      >
        <label>
          Todo title:
          <textarea
            name="title"
            placeholder="Todo title"
            value={title}
            onChange={this.handleChange}
          />
          {!isTitleValid && (
            <span>Please, enter the title</span>
          )}
        </label>
        <label>
          Todo user:
          <select
            name="userId"
            value={userId}
            onChange={this.handleChange}
          >
            <option value="">Choose user</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {!isUserIdValid && (
            <span>Please, choose user</span>
          )}
        </label>
        <button
          type="submit"
        >
          Add todo
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: UserType.isRequired,
};

export default Form;
