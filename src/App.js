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
    // id: prepareTodos.length,
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
    if (this.state.title === '') {
      this.setState({ todoError: true });
    }

    if (this.state.name === '') {
      this.setState({ userError: true });
    }

    if (this.state.name !== '' && this.state.title !== '') {
      this.setState(state => ({
        todosArray: [
          ...state.todosArray,
          {
            name: state.name,
            title: state.title,
            completed: false,
          },
        ],
      }));
      this.setState({
        todoError: false,
        userError: false,
        name: '',
        title: '',
      });
      event.preventDefault();
    }
  }

  render() {
    const newTodos = [...this.state.todosArray];
    const { title } = this.state;

    return (
      <div className="App">
        <form
          action="#"
          method="GET"
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
          <select onChange={this.handleSelect}>
            <option value="">{this.state.name}</option>
            {users.map(user => (
              <>
                <option value={user.name} key={user.id}>
                  {user.name}
                </option>
              </>
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
