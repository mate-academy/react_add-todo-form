import React from 'react';
import users from '../../api/users';
import PropTypes from 'prop-types';
import { TodoList } from '../TodoList/TodoList';
import '../Form/Form.css';

export class Form extends React.Component {
  state = {
    textTodo: '',
    userName: '',
    hasTextError: false,
    hasUserError: false,
    users: [...users],
    todos: [...this.props.todos],
  }

  handleTodoAdd = (event) => {
    event.preventDefault();
    const {textTodo, userName} = this.state;

    if (!textTodo || !userName) {
      this.setState({
        hasTextError: !textTodo,
        hasUserError: !userName,
      });

      return;
    }

    this.setState(state => {
      const newTodo = {
        userId: 1,
        id: state.todos.length + 1,
        title: state.textTodo,
        completed: false,
      };

      return {
        todos: [...state.todos, newTodo],
        hasTextError: false,
        hasUserError: false,
        textTodo: '',
        userName: '',
      };
    });
  };

  render() {
    const {
      textTodo,
      todos,
      hasTextError,
      users,
      userName,
      hasUserError,
    } = this.state;
    
    return (
      <div className="todo">
        <TodoList
          todos={todos}
          users={users}
        />
        <form
          className="todo__form"
          onSubmit={this.handleTodoAdd}
        >
          <div>
            <label htmlFor="task"></label>
            <input
              className="task"
              type="text"
              placeholder="Entet your task" 
              name="task"
              id="task"
              value={textTodo}
              onChange={(event) => {
                this.setState({
                  hasTextError: false, 
                  textTodo: event.target.value,
                });
              }}
            />
            {hasTextError && (
              <span className="error">Please enter todo text</span>
            )}
          </div>

          <div>
            <select
              className="user"
              name="user"
              value={userName}
              onChange={(event) => {
                this.setState({
                  hasUserError: false,
                  userName: event.target.value,
                })
              }}
            >
              <option value="">Please choose user</option>
              {
                users.map(user => (
                  <option value={user.name} key={user.id}>
                    {user.name}
                  </option>
                ))
              }
            </select>
            {hasUserError && (
              <span className="error">Please select a color</span>
            )}
          </div>
          <button className="todo__add">Add todo</button>
        </form>
      </div>
    )
  }
}

Form.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape ({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  })).isRequired
}
