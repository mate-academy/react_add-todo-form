import React from 'react';
import users from '../../api/users';
import PropTypes from 'prop-types';
import { TodoList } from '../TodoList/TodoList';
import '../Form/Form.css';

const regx = 
  /(?=^.{8,16}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
export class Form extends React.Component {
  state = {
    textTodo: '',
    userName: '',
    hasTextError: false,
    hasUserError: false,
    users: [...users],
    todos: [...this.props.todos],
  }

  handleChange = (event) => {
    event.preventDefault();
    let {name, value} = event.target;
    const { textTodo } = this.state;

    if (value[0] === ' ') {
      value = '';
    }
  
    if (String(name) === "userName") {
      this.setState({hasUserError: false});
    }

    if (String(name) === "textTodo") {
      this.setState({hasTextError: false});
    }

    this.setState({ [name]: value});
  }

  handleTodoAdd = (event) => {
    event.preventDefault();
    const {textTodo, userName, hasFirstSpace} = this.state;

    if (textTodo[0] === ' ') {
      this.setState({
        hasFirstSpace: true,
      });

      return ;
    }

    if (!textTodo || !userName ) {
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
      hasFirstSpace,
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
              placeholder="Enter your task" 
              name="textTodo"
              id="task"
              value={textTodo}
              onChange={this.handleChange}
            />
            {
              hasTextError && (
                <span className="error">Please enter your task</span>
            )}
          </div>

          <div>
            <select
              className="user"
              name="userName"
              value={userName}
              onChange={this.handleChange}
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
              <span className="error">Please select a user</span>
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
