import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';

export class Form extends React.Component {
  state = {
    titleEntered: true,
    userNameSelected: true,
    title: '',
    userName: '',
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
      titleEntered: true,
      userNameSelected: true,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  onAdd = () => {
    const { title, userName } = this.state;
    const { addTodo, preparedTodos, users } = this.props;

    const user = users.find(user => user.name === userName)

    const newTodo = {
      userId: userName,
      id: preparedTodos.length + 1,
      title,
      completed: false,
      user,
    };

    if (!userName) {
      this.setState({ userNameSelected: false })
    }

    if (!title.trim()) {
      this.setState({ titleEntered: false })
    }

    if (userName && title.trim()) {
      addTodo(newTodo);
      this.setState({
        title: '',
        userName: '',
      });
    }
  }


  render() {
    const { users } = this.props;
    const {
      userName,
      title,
      titleEntered,
      userNameSelected
    } = this.state;
    return (
      <form
        onSubmit={this.handleSubmit}
        className="todo-form">
        <div className="form-inner">
          <h2>
            Add new todo
      </h2>
          <div className="form-content">
            {!titleEntered &&
              <label>Please enter the title</label>
            }
            <input
              type="text"
              placeholder="enter the title"
              name="title"
              value={title}
              onChange={this.handleChange}
            />
            {!userNameSelected &&
              <label>Please select a user</label>
            }
            <select
              name="userName"
              value={userName}
              onChange={this.handleChange}
            >
              <option hidden>choose a user</option>
              {users.map((user) => (
                <option
                  key={user.id}
                  value={user.name}
                >
                  {user.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              value="Add todo"
              className="add-btn"
              onClick={this.onAdd}
            >
              Add todo
          </button>
          </div>
        </div>
      </form>
    )
  }
}

Form.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
