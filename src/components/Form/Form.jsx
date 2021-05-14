import React from 'react';
import PropTypes from 'prop-types';
import { UserType } from '../Todo';

class Form extends React.Component {
  state = {
    title: '',
    userId: '',
    titleValid: true,
    userIdValid: true,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });

    switch (name) {
      case 'title':
        this.setState({
          titleValid: true,
        });
        break;
      case 'userId':
        this.setState({
          userIdValid: true,
        });
        break;
      default:
        break;
    }
  }

  checkTodo = (userId, title) => {
    this.setState({
      titleValid: /^\w+$/.test(title),
      userIdValid: userId,
    });

    if (this.state.title !== '' && this.state.userId !== ''
    && /^\w+$/.test(title)) {
      this.setState({
        title: '',
        userId: '',
      });
      this.props.addTodo(userId, title);
    }
  }

  render() {
    const { titleValid, userIdValid, userId, title } = this.state;

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
          {!titleValid
          && <span>Please, enter the title</span>
          }
        </label>
        <label>
          Todo user:
          <select
            name="userId"
            value={userId}
            onChange={this.handleChange}
          >
            <option value="">Choose user</option>
            {this.props.users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {!userIdValid
          && <span>Please, choose user</span>
          }
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
