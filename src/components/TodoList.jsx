import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import Todo from './Todo';

export class TodoList extends React.Component {
  state = {
    todos: [...this.props.todos],
    title: '',
    userName: '',
    isTodoAdded: true,
    isUserSelected: true,
  };

  handleChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
      isTodoAdded: true,
    });
  }

  handleUserAdded = (event) => {
    this.setState({
      userName: event.target.value,
      isUserSelected: true,
    });
  }

  addNewTodo = (event) => {
    event.preventDefault();

    const { users } = this.props;

    this.setState(({ todos, title, userName }) => {
      if (!title) {
        return { isTitleAdd: false };
      }

      if (!userName) {
        return { isUserSelected: false };
      }

      return ({
        todos: [...todos, {
          id: todos.length + 1,
          title,
          completed: false,
          user: users.find(user => user.name === userName),
        }],
        title: '',
        userName: '',
      });
    });
  };

  render() {
    const { users } = this.props;
    const {
      todos,
      isTodoAdded,
      isUserSelected,
    } = this.state;

    return (
      <>
        <form onSubmit={this.addNewTodo}>
          <input
            type="text"
            name="newTodo"
            id="newTodo"
            placeholder="Add new todo"
            onChange={this.handleChangeTitle}
          />
          <p className={
            classNames(`new-todo-error`, { hide: isTodoAdded })
          }
          >
            Please, enter your todo
          </p>
          <select
            name="users"
            onChange={this.handleChangeUser}
          >
            <option disabled value="">Select user</option>
            {users.map(({ id, name }) => (
              <option key={id}>
                {name}
              </option>
            ))}
          </select>
          <p className={
            classNames(`new-todo-error`, { hide: isUserSelected })
          }
          >
            Please, select user
          </p>
          <button type="submit">Add todo</button>
        </form>
        <ul className="list">
          {todos.map(todo => (
            <li key={todo.id}>
              <Todo {...todo} />
            </li>
          ))}
        </ul>
      </>
    );
  }
}

TodoList.propTypes = {
  todos: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
    }),
  ).isRequired,

  users: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
    }),
  ).isRequired,
};
