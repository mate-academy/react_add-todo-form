import React from 'react';
import TodoShape from '../../Shapes';

class Menu extends React.Component {
  state = {
    title: '',
    userId: 0,
    inputError: false,
    selectError: false,
  }

  setTodoTitle = (value) => {
    this.setState({
      title: value.replace(/\s/, ' ').replace(/^\s/, ''),
      inputError: false,
    });
  }

  setSelectUser = (value) => {
    this.setState({
      userId: Number(value),
      selectError: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, userId } = this.state;
    const { createTodo, users, todos } = this.props;

    if (!title) {
      this.setState({
        inputError: true,
      });

      return false;
    }

    if (userId === 0) {
      this.setState({
        selectError: true,
      });

      return false;
    }

    createTodo({
      id: todos.length + 1,
      user: users.find(user => user.id === userId),
      title,
    });

    this.setState({
      title: '',
      userId: 0,
    });

    return true;
  }

  render() {
    const { title, userId, inputError, selectError } = this.state;
    const { users } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        {
          inputError && (
            <h3>
              Add todo description!
            </h3>
          )
        }
        {
          selectError && (
            <h3>
              Choose a user!
            </h3>
          )
        }
        <label htmlFor="enter-todo">Title</label>
        <input
          id="enter-todo"
          onChange={event => this.setTodoTitle(event.target.value)}
          value={title}
        />
        <select
          value={userId}
          onChange={event => this.setSelectUser(event.target.value)}
        >
          <option
            disabled
            selected
            value={0}
          >
            Choose user
          </option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
        >
          Add todo
        </button>
      </form>
    );
  }
}

Menu.propTypes = TodoShape.isRequired;

export default Menu;
