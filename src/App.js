import React from 'react';
import './App.css';
import NewTodo from './components/NewTodo/NewTodo';
import Header from './components/Header/Header';

import users from './api/users';
import todos from './api/todos';

function getTodosWithUsers(todos, users) {
  return todos.map(todo => ({
    ...todo,
    user: users.find(item => item.id === todo.userId),
  }));
}

class App extends React.Component {
  state = {
    todos: getTodosWithUsers(todos, users),
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }))
  };

  render() {
    const { todos } = this.state;

    return (
      <>
        <Header users={users} todos={todos} />
        <main className="ui inverted segment">
          <NewTodo
            users={users}
            todos={todos}
            addTodo={this.addTodo}
          />
          <table className="ui selectable inverted table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Todos</th>
                <th>Status</th>
              </tr>
            </thead>
            {todos.map(todo => (
              <tr>
                <td>{todo.id}</td>
                <td>{todo.user.name}</td>
                <td>{todo.title}</td>
                <td>
                  <i className="red times circle outline icon" />
                </td>
              </tr>
            ))}
          </table>
        </main>
      </>
    );
  }
}

export default App;
