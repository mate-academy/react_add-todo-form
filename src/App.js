import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';
import { render } from 'react-dom';

const preparedTodos = todos.map(
  todo => {
    const user = users.find(
      person => person.id === todo.userId
    )

    return { ...todo, user };
  }
);

const maxIndex = todos.reduce((a, b) => {
  return Math.max(a.id, b.id);
});

class App extends React.Component {
  state = {
    todos: preparedTodos,
    users: [...users],
    maxIndex: maxIndex,
    title: '',
    titleError: false,
    userId: '',
    userIdError: false,
  }
  
  addTodo = () => {
    const { userId, maxIndex, title } = this.state;
    const newTodo = {
      user: users.find(user => user.id === parseInt(userId)),
      id: maxIndex + 1,
      title,
      completed: false,
    }

    this.setState(state => ({
        todos: [...state.todos, newTodo ],
        maxIndex: state.maxIndex + 1,
      })
    )
  }

  clearForm = () => {
    this.setState({ title: '', userId: '' });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'title') {
      this.setState({ 
        [name]: value,
        titleError: value === '',
      });
    }

    if (name === 'userId') {
      this.setState({ 
        [name]: value,
        userIdError: value === '',
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { titleError, userIdError, title, userId } = this.state;

    if (title === '' || userId === '') {
      this.setState({
        titleError: title === '',
        userIdError: userId === '',
      });

      return;
    }

    if (!titleError && !userIdError) {
      this.addTodo();
      this.clearForm();
    }
  }

  render () {
    const { todos, users, title, userId, titleError, userIdError } = this.state;
    console.log(titleError, userIdError);

    return (
      <div className="App">
        <h1>ToDo</h1>

        <form onSubmit={this.handleSubmit}>
          <input
            name="title"
            value={title}
            placeholder="ToDo description"
            onChange={this.handleChange}
          />
          {titleError
            && (<span className="error">Input ToDo description</span>)}
          <select
            name="userId"
            value={userId}
            onChange={this.handleChange}
          >
            <option value="">
              Choose a user
            </option>
            {
              users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))
            }
          </select>
          {userIdError
            && (<span className="error">Choose user option</span>)}
          <button type="submit">Add</button>
        </form>

        <TodoList todos={todos} />
      </div>
      );
  }  
}

export default App;
