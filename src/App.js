import React from 'react';
import './App.css';
import { TodoForm } from './Component/TodoForm';

import todos from './api/todos';
import users from './api/users';

function getTodosWithUsers(allTodos, allUsers) {
  return allTodos.map(oneTodo => ({
    ...oneTodo,
    user: allUsers.find(person => person.id === oneTodo.userId),
  }));
}

export class App extends React.Component {
  state = {
    allTodos: getTodosWithUsers(todos, users),
  }

  addTodo = newTodo => (
    this.setState(prevState => ({
      allTodos: [...prevState.allTodos, {
        ...newTodo,
        id: prevState.allTodos.length + 1,
      }],
    }))
  );

  render() {
    return (
      <section>
        <div className="App">
          <TodoForm addTodo={this.addTodo} />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th className="table__heading">ID</th>
              <th className="table__heading">Title</th>
              <th className="table__heading">User</th>
            </tr>
          </thead>
          <tbody>
            {this.state.allTodos.map(todo => (
              <tr>
                <td className="table__item">{todo.id}</td>
                <td className="table__item">{todo.title}</td>
                <td className="table__item">{todo.user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}
