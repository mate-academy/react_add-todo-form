import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import TodoList from './components/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId).name,
}));

class App extends React.Component {
  state = {
    todosList: preparedTodos,
    id: preparedTodos.length + 1,
    todo: '',
    user: '',
    isErrorTodo: false,
    isErrorUser: false,
  }

  changeTodo = (e) => {
    this.setState({
      todo: e.target.value.replace(/[^ \w]/g, '').replace(/\s{2,}/, ''),
      isErrorTodo: false,
    });
  }

  changeUser = (e) => {
    this.setState({
      user: e.target.value,
      isErrorUser: false,
    });
  }

  addTodo = (e) => {
    e.preventDefault();
    const { user, todo } = this.state;

    if (!user) {
      this.setState({
        isErrorUser: true,
      });
    }

    if (!todo) {
      this.setState({
        isErrorTodo: true,
      });
    }

    if (user && todo) {
      this.setState((state) => {
        const newTodo = {
          id: state.id,
          user: state.user,
          title: state.todo,
          completed: state.id % 2 !== 0,
        };

        return {
          todosList: [...state.todosList, newTodo],
          id: state.id + 1,
          user: '',
          todo: '',
        };
      });
    }
  }

  render() {
    const { user, todo, isErrorTodo, isErrorUser, todosList } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form
          action=""
          method="POST"
          onSubmit={this.addTodo}
        >
          <label htmlFor="input-todo">
            <b>Add todo: </b>
          </label>
          <input
            type="text"
            placeholder="Input todo:"
            id="input-todo"
            className="input-todo"
            value={todo}
            onChange={this.changeTodo}
          />
          {
            isErrorTodo
              && <span className="error-text"> Please enter title</span>
          }
          <br />

          <label htmlFor="choose-user">
            <b>Add user: </b>
          </label>
          <select
            id="choose-user"
            className="select-user"
            value={user}
            onChange={this.changeUser}
          >
            <option value="">Choose a user:</option>
            {
              users.map(currUser => (
                <option key={currUser.id}>{currUser.name}</option>
              ))
            }
          </select>
          {
            isErrorUser
              && <span className="error-text"> Please choose a user</span>
          }
          <br />

          <button type="submit" className="button-submit">ADD</button>
        </form>

        <TodoList todosList={todosList} />
      </div>
    );
  }
}

export default App;
