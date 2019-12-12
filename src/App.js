import React from 'react';
import './App.css';
import TodosList from './components/TodosList';
import CreateNewTodo from './components/CreateNewTodo';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    visibleTodos: [],
  }

  async componentDidMount() {
    const usersAndTodos = todos.map((todo, index) => ({
      id: index + 1,
      ...todo,
      user: users.find(user => todo.userId === user.id),
    }));

    this.setState({
      visibleTodos: usersAndTodos,
    });
  }

  addTodo = (todo) => {
    this.setState((prevState) => {
      const copiedTodo = [...prevState.visibleTodos, todo];

      return {
        visibleTodos: copiedTodo,
      };
    });
  }

  render() {
    const { visibleTodos } = this.state;

    return (
      <div className="App">
        <CreateNewTodo
          todos={visibleTodos}
          onSubmit={this.addTodo}
        />
        {visibleTodos.map(todo => (
          <TodosList
            key={todo.id}
            todo={todo}
          />
        ))}
      </div>
    );
  }
}

export default App;
