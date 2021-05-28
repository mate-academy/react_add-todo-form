import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class TodosList extends React.Component {
  state = {
    todos: [...this.props.todos],

    title: '',
    userName: '',

    titleError: true,
    selectError: true,
  };

  handleChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
      titleError: true,
    });
  };

  handleChangeUser = (event) => {
    this.setState({
      userName: event.target.value,
      selectError: true,
    });
  };

  addTodo = (event) => {
    event.preventDefault();

    const { users } = this.props;

    this.setState(({ todos, title, userName }) => {
      if (!title && !userName) {
        return {
          titleError: false,
          selectError: false,
        };
      }

      if (!title) {
        return { titleError: false };
      }

      if (!userName) {
        return { selectError: false };
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
      title,
      userName,
      titleError,
      selectError,
    } = this.state;

    return (
      <>
        <form className="form" onSubmit={this.addTodo}>

          <input
            type="text"
            name="title"
            className="form__input"
            value={title}
            onChange={this.handleChangeTitle}
            placeholder="Write new todo..."
          />

          <select
            name="userName"
            className="form__select"
            value={userName}
            onChange={this.handleChangeUser}
          >

            <option disabled value="">Select user</option>

            {users.map(({ id, name }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}

          </select>

          <button type="submit" className="form__button">Add</button>
        </form>

        <span className={classNames('error', { active: titleError })}>
          Please enter the new todo
        </span>

        <span className={classNames('error', { active: selectError })}>
          Please choose a user
        </span>

        <ul className="todoList">

          {todos.map(todo => (
            <li className="todoList__item" key={todo.id}>

              <div className="todoList__user-name">
                User:
                {' '}
                {todo.user.name}
              </div>

              <div className="todoList__title">
                Todo:
                {' '}
                {todo.title}
              </div>

              <div className="todoList__status">
                Status:
                {' '}
                {todo.completed ? 'Completed' : 'Incompleted'}
              </div>

            </li>
          ))}

        </ul>
      </>
    );
  }
}

const propTypesOfTodos = PropTypes.shape({
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
});

const propTypesOfUsers = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});

TodosList.propTypes = {
  todos: PropTypes.arrayOf(propTypesOfTodos).isRequired,
  users: PropTypes.arrayOf(propTypesOfUsers).isRequired,
};

export default TodosList;
