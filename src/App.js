import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import TodoList from './TodoList';
import NewTodo from './NewTodo';

class App extends React.Component {
  state = {
    todos: [],
  }

  async componentDidMount() {
    this.setState({
      todos: todos.map((todo, index) => ({
        ...todo,
        ...users.find(user => user.id === todo.userId),
        id: index + 1,
      })),
    });
  }

  addTodo = (newTodo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
    }));
  }

  render() {
    return (
      <div className="App">
        <NewTodo
          users={users}
          todos={this.state.todos}
          addTodo={this.addTodo}
        />
        <table>
          <caption>The list of Todos</caption>
          <tbody>
            <tr>
              <th>#</th>
              <th>Todo</th>
              <th>Responsible</th>
              <th>Completed</th>
            </tr>
            {this.state.todos.map(
              todo => <TodoList key={todo.id} todo={todo} />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
