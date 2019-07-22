import React from 'react';

import TodoList from './components/TodoList';
import todos from './api/todos';
import users from './api/users';
import AddTodo from './components/AddTodo';

import './App.css';

class App extends React.Component {
  state = {
    todosWithUsers: [],
    isVisible: false,
  }

  componentDidMount() {
    const todosWithUsers = todos.map((todo) => {
      const user = users.find(person => person.id === todo.userId);

      return {
        ...todo,
        user,
      };
    });

    this.setState({ todosWithUsers });
  }

  addNewTodo = (todo) => {
    this.setState(prevState => ({
      todosWithUsers: [...prevState.todosWithUsers, todo],
    }));
  };

  toggleForm = () => {
    this.setState(prevState => ({
      isVisible: !prevState.isVisible,
    }));
  }

  render() {
    const { todosWithUsers, isVisible } = this.state;

    return (
      <div className="App">
        <h1>Static list of todos</h1>

        { isVisible ? (
          <AddTodo
            addNewTodo={this.addNewTodo}
            users={users}
            todos={todosWithUsers}
          />
        ) : (
          <button
            type="button"
            onClick={this.toggleForm}
            className="form-btn"
          >
            Add new todo
          </button>
        )
        }

        <TodoList todos={todosWithUsers} />
      </div>
    );
  }
}

export default App;
