import React from 'react';
import './App.css';
import TodoList from './Components/TodoList/TodoList';
import users from './api/users';
import todos from './api/todos';

const prepareTodos = todos.map(todo => ({
  ...todo,
  name: users.find(user => user.id === todo.userId).name,
}));

class App extends React.Component {
  state = {
    todosArray: [...prepareTodos],
    name: '',
    title: '',
    todoError: false,
    userError: false,
  }

  handleText = (event) => {
    this.setState({ title: event.target.value });
  };

  handleSelect = (event) => {
    this.setState({ name: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.title === '') {
      this.setState({ todoError: true });

      // return;
    }

    if (this.state.name === '') {
      this.setState({ userError: true });

      // return;
    }

    if (this.state.name !== '' && this.state.title !== '') {
      this.setState(state => ({
        name: '',
        title: '',
        todoError: false,
        userError: false,
        todosArray: [
          ...state.todosArray,
          {
            name: state.name,
            title: state.title,
            completed: false,
          },
        ],
      }));
    }
  }

  render() {
    const newTodos = [...this.state.todosArray];
    const { title } = this.state;

    return (
      <div className="App">
        <form
          onSubmit={event => this.handleSubmit(event)}
        >
          {this.state.todoError && (
            <span>Please enter the title</span>
          )}
          {' '}
          <input
            type="text"
            placeholder="write to do"
            value={title}
            onChange={this.handleText}
          />
          {' '}

          {this.state.userError && (
            <span>Please choose user</span>
          )}

          {' '}
          <select value={this.state.name} onChange={this.handleSelect}>
            <option value="">Choose user</option>
            {users.map(user => (
              <option value={user.name} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {' '}
          <input type="submit" value="add" />
        </form>
        <TodoList todos={newTodos} />
      </div>
    );
  }
}

export default App;
